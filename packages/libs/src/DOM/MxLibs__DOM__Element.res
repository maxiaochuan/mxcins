type t = Dom.element

@get external offsetWidth: t => int = "offsetWidth"

@get external offsetHeight: t => int = "offsetHeight"

@get external innerHTML: t => string = "innerHTML"
@set external setInnerHTML: (t, string) => unit = "innerHTML"

@send external getBoundingClientRect: t => MxLibs__DOM__DomRect.t = "getBoundingClientRect"

include MxLibs__DOM__EventTarget.Mixin({
  type t = t
})

include MxLibs__DOM_Node.Mixin({
  type t = t
})
