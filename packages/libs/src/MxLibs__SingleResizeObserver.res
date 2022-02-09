open MxLibs__DOM
open MxLibs__STD

module ResizeObserverEntry = ResizeObserver.ResizeObserverEntry

type callback = ResizeObserverEntry.t => unit

%%private(let collections: Map.t<Element.t, Set.t<callback>> = Map.make())

%%private(
  let observer = ResizeObserver.make(entries => {
    entries->Js.Array2.forEach(entry =>
      switch entry->ResizeObserverEntry.target |> Map.get(collections) {
      | Some(callbacks) => callbacks->Set.forEach(callback => entry->callback)
      | None => ()
      }
    )
  })
)

let observe = (element: Element.t, callback) =>
  switch element |> Map.get(collections) {
  | Some(callbacks) => {
      let _ = callbacks ->Set.add(callback)
    }
  | None => {
      observer->ResizeObserver.observe(element)
      let callbacks = Set.make()->Set.add(callback)
      let _ = collections->Map.set(element, callbacks)
    }
  }

let unobserve = (element: Element.t, callback) =>
  switch element |> Map.get(collections) {
  | Some(callbacks) => {
      let _ = callbacks-> Set.delete(callback)
      if callbacks->Set.size === 0 {
        observer->ResizeObserver.unobserve(element)
      }
    }
  | None => ()
  }
