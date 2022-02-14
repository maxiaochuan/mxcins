open MxLibs__DOM
open MxLibs__STD

module ResizeObserverEntry = ResizeObserver.ResizeObserverEntry

type callback = ResizeObserverEntry.t => unit

%%private(let collections: Map.t<Element.t, Set.t<callback>> = Map.make())

%%private(
  let observer = ResizeObserver.make(entries => {
    entries->Js.Array2.forEach(entry =>
      switch collections->Map.get(entry->ResizeObserverEntry.target) {
      | Some(callbacks) => callbacks->Set.forEach(callback => entry->callback)
      | None => ()
      }
    )
  })
)

let observe = (element: Element.t, callback) =>
  switch collections->Map.get(element) {
  | Some(callbacks) => callbacks->Set.add(callback)->ignore
  | None => {
      observer->ResizeObserver.observe(element)
      let callbacks = Set.make()->Set.add(callback)
      collections->Map.set(element, callbacks)->ignore
    }
  }

let unobserve = (element: Element.t, callback) =>
  switch collections->Map.get(element) {
  | Some(callbacks) => {
      callbacks->Set.delete(callback)->ignore
      if callbacks->Set.size === 0 {
        observer->ResizeObserver.unobserve(element)
      }
    }
  | None => ()
  }
