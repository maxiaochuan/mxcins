type t = Dom.window

@get external innerHeight: t => int = "innerHeight"

include MxLibs__DOM__MixinEvents.Mixin({
  type t = t
})
