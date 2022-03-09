open MxLibs__STD

module ResizeObserverEntry = Webapi.ResizeObserver.ResizeObserverEntry

type element = Webapi.Dom.Element.t

type callback = ResizeObserverEntry.t => unit

%%private(let collections: Map.t<element, Set.t<callback>> = Map.make())

%%private(
  let observer = Webapi.ResizeObserver.make(entries => {
    entries->Js.Array2.forEach(entry =>
      switch collections->Map.get(entry->ResizeObserverEntry.target) {
      | Some(callbacks) => callbacks->Set.forEach(callback => entry->callback)
      | None => ()
      }
    )
  })
)

let observe = (element, callback) =>
  switch collections->Map.get(element) {
  | Some(callbacks) => callbacks->Set.add(callback)->ignore
  | None => {
      observer->Webapi.ResizeObserver.observe(element)
      let callbacks = Set.make()->Set.add(callback)
      collections->Map.set(element, callbacks)->ignore
    }
  }

let unobserve = (element, callback) =>
  switch collections->Map.get(element) {
  | Some(callbacks) => {
      callbacks->Set.delete(callback)->ignore
      if callbacks->Set.size === 0 {
        observer->Webapi.ResizeObserver.unobserve(element)
      }
    }
  | None => ()
  }
