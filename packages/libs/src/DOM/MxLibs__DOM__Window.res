type t = Dom.window

@get external innerHeight: t => int = "innerHeight"

include MxLibs__DOM__EventTarget.Mixin({
  type t = t
})
