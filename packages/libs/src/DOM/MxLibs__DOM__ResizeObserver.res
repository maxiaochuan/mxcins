module ResizeObserverEntry = {
  type t = Dom.resizeObserverEntry

  @get
  external target: t => MxLibs__DOM__Element.t = "target"
}

type t = Dom.resizeObserver

@new @module("resize-observer-polyfill")
external make: (array<ResizeObserverEntry.t> => unit) => t = "default"

@send
external observe: (t, MxLibs__DOM__Element.t) => unit = "observe"

@send
external unobserve: (t, MxLibs__DOM__Element.t) => unit = "unobserve"
