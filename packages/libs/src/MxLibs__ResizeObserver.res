module ResizeObserverEntry = {
  type t = Dom.resizeObserverEntry

  @get
  external target: t => Dom.element = "target"
}

module ResizeObserver = {
  type t = Dom.resizeObserver

  @new @module("resize-observer-polyfill")
  external make: (array<ResizeObserverEntry.t> => unit) => t = "default"

  @send
  external observe: (t, Dom.element) => unit = "observe"

  @send
  external unobserve: (t, Dom.element) => unit = "unobserve"
}

%%private(let mapTargetCallbacks = MxLibs__JsMap.make())
%%private(let getTargetCallbacks = target => mapTargetCallbacks->MxLibs__JsMap.get(target))
%%private(
  let setTargetCallbacks = (target, callback) => mapTargetCallbacks->MxLibs__JsMap.set(target, callback)
)

%%private(
  let observer = ResizeObserver.make(entries => {
    entries->Js.Array2.forEach(entry =>
      switch entry->ResizeObserverEntry.target->getTargetCallbacks {
      | Some(callbacks) => MxLibs__JsSet.forEach(callbacks, callback => entry->callback)
      | None => ()
      }
    )
  })
)

let observe = (element: Dom.element, callback: ResizeObserverEntry.t => unit) =>
  switch element->getTargetCallbacks {
  | Some(callbacks) => {
      let _ = MxLibs__JsSet.add(callbacks, callback)
    }
  | None => {
      observer->ResizeObserver.observe(element)
      let callbacks = MxLibs__JsSet.make()->MxLibs__JsSet.add(callback)
      let _ = setTargetCallbacks(element, callbacks)
    }
  }

let unobserve = (element: Dom.element, callback: ResizeObserverEntry.t => unit) =>
  switch element->getTargetCallbacks {
  | Some(callbacks) => {
      let _ = MxLibs__JsSet.delete(callbacks, callback)
      if callbacks->MxLibs__JsSet.size === 0 {
        // observer.unobserve(element)
        observer->ResizeObserver.unobserve(element)
      }
    }
  | None => ()
  }
