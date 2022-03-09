module ResizeObserverEntry = {
  type t = Dom.resizeObserverEntry

  @get external contentRect: t => Dom.domRect = "contentRect"
  @get external target: t => Dom.element = "target"
}

type t = Dom.resizeObserver

@send external disconnect: t => unit = "disconnect"
@send external observe: (t, Dom.element) => unit = "observe"
@send external unobserve: (t, Dom.element) => unit = "unobserve"

@new @module("resize-observer-polyfill")
external make: (array<ResizeObserverEntry.t> => unit) => t = "default"

@new @module("resize-observer-polyfill")
external makeWithObserver: ((array<ResizeObserverEntry.t>, t) => unit) => t = "default"
