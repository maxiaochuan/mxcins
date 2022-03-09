open MxLibs__STD

module ResizeObserverEntry = MxLibs__ResizeObserver.ResizeObserverEntry

type element = Webapi.Dom.Element.t

type callback = ResizeObserverEntry.t => unit

%%private(let collections = Map.make())

%%private(
  let observer = MxLibs__ResizeObserver.make(entries => {
    open Js.Array2
    open ResizeObserverEntry
    entries->forEach(entry =>
      switch collections->Map.get(entry->target) {
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
      observer->MxLibs__ResizeObserver.observe(element)
      let callbacks = Set.make()->Set.add(callback)
      collections->Map.set(element, callbacks)->ignore
    }
  }

let unobserve = (element, callback) =>
  switch collections->Map.get(element) {
  | Some(callbacks) => {
      callbacks->Set.delete(callback)->ignore
      if callbacks->Set.size === 0 {
        observer->MxLibs__ResizeObserver.unobserve(element)
      }
    }
  | None => ()
  }
