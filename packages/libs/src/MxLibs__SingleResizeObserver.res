module ResizeObserver = MxLibs__ResizeObserver

module ResizeListenerSet = {
  type resizeListener = ResizeObserver.ResizeObserverEntry.t => unit

  module Id = Belt.Id.MakeComparable({
    type t = resizeListener
    let cmp = Pervasives.compare
  })

  let make = () => Belt.MutableSet.make(~id=module(Id))

  let fromArray = arr => Belt.MutableSet.fromArray(arr, ~id=module(Id))
}

module ElementResizeListenersMap = {
  module Id = Belt.Id.MakeComparable({
    type t = Dom.element
    let cmp = Pervasives.compare
  })
  let make = () => Belt.MutableMap.make(~id=module(Id))
}

let store = ElementResizeListenersMap.make()

let observer = ResizeObserver.make(entries => {
  entries->Js.Array2.forEach(entry =>
    store
    ->Belt.MutableMap.get(entry->ResizeObserver.ResizeObserverEntry.target)
    ->Belt.Option.forEach(listeners =>
      listeners->Belt.MutableSet.forEach(listener => entry->listener)
    )
  )
})

let observe = (element, listener) =>
  switch store->Belt.MutableMap.get(element) {
  | Some(listeners) => listeners->Belt.MutableSet.add(listener)
  | _ => store->Belt.MutableMap.set(element, [listener]->ResizeListenerSet.fromArray)
  }

let unobserve = (element, listener) =>
  store
  ->Belt.MutableMap.get(element)
  ->Belt.Option.forEach(listeners => {
    listeners->Belt.MutableSet.remove(listener)
    if listeners->Belt.MutableSet.size === 0 {
      observer->ResizeObserver.unobserve(element)
    }
  })
