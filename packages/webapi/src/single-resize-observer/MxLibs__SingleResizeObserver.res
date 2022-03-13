module ResizeObserver = MxLibs__ResizeObserver
module ResizeObserverEntry = MxLibs__ResizeObserver.ResizeObserverEntry

module ResizeListenerSet = {
  @genType.as("ResizeListenerType")
  type resizeListener = ResizeObserverEntry.t => unit

  module Id = Belt.Id.MakeComparable({
    type t = resizeListener
    let cmp = Pervasives.compare
  })

  let fromArray = arr => arr->Belt.MutableSet.fromArray(~id=module(Id))
}

module ElementResizeListenersMap = {
  module Id = Belt.Id.MakeComparable({
    type t = Dom.element
    let cmp = Pervasives.compare
  })

  let make = () => Belt.MutableMap.make(~id=module(Id))
}

%%private(let store = ElementResizeListenersMap.make())

%%private(
  let observer = ResizeObserver.make(entries => {
    entries->Js.Array2.forEach(entry =>
      store
      ->Belt.MutableMap.get(entry->ResizeObserver.ResizeObserverEntry.target)
      ->Belt.Option.forEach(listeners =>
        listeners->Belt.MutableSet.forEach(listener => entry->listener)
      )
    )
  })
)

@genType
let observe = (element, listener) =>
  switch store->Belt.MutableMap.get(element) {
  | None => {
      store->Belt.MutableMap.set(element, [listener]->ResizeListenerSet.fromArray)
      observer->ResizeObserver.observe(element)
    }
  | Some(listeners) => listeners->Belt.MutableSet.add(listener)
  }

@genType
let unobserve = (element, listener) =>
  store
  ->Belt.MutableMap.get(element)
  ->Belt.Option.forEach(listeners => {
    listeners->Belt.MutableSet.remove(listener)
    if listeners->Belt.MutableSet.size === 0 {
      observer->ResizeObserver.unobserve(element)
    }
  })
