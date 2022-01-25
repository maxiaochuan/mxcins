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

%%private(let map = MxLibs__JsMap.make())

%%private(let observer = ResizeObserver.make(entries => {
  Js.Array.forEach(entry => {
    let target = entry->ResizeObserverEntry.target
    map
    ->MxLibs__JsMap.get(target)
    ->Js.Option.getExn
    ->MxLibs__JsSet.forEach(callback => entry -> callback)
    // for i in 0 to Js.Array.length(entries) {
    //   let callbacks = map.get(entry.target);
    //   Js.log(i)
    // }
  }, entries)
}))

let observe = (element: Dom.element, callback: ResizeObserverEntry.t => unit) =>
  switch map->MxLibs__JsMap.get(element) {
  | Some(set) => {
      let _ = set->MxLibs__JsSet.add(callback)
    }
  | None => {
      observer->ResizeObserver.observe(element)
      let set = MxLibs__JsSet.make()->MxLibs__JsSet.add(callback)
      let _ = map->MxLibs__JsMap.set(element, set)
    }
  }

let unobserve = (element: Dom.element, callback: ResizeObserverEntry.t => unit) =>
  switch map->MxLibs__JsMap.get(element) {
  | Some(set) => {
      let _ = set->MxLibs__JsSet.delete(callback)
      if set->MxLibs__JsSet.size === 0 {
        // observer.unobserve(element)
        observer->ResizeObserver.unobserve(element)
      }
    }
  | None => ()
  }
