type t = Dom.element

@get external offsetWidth: t => int = "offsetWidth"

@get external offsetHeight: t => int = "offsetHeight"

@send external getBoundingClientRect: t => MxLibs__DOM__DomRect.t = "getBoundingClientRect"

include MxLibs__DOM__EventTarget.Mixin({
  type t = t
})
