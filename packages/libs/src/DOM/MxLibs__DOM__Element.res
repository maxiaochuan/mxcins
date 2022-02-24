type t = Dom.element

module Impl = (
  T: {
    type t
  },
) => {
  @get external offsetWidth: T.t => int = "offsetWidth"

  @get external offsetHeight: T.t => int = "offsetHeight"

  @send external getBoundingClientRect: T.t => Dom.domRect = "getBoundingClientRect"

  @send external addEventListener: (T.t, string, Dom.event => unit) => unit = "addEventListener"

  @send
  external removeEventListener: (T.t, string, Dom.event => unit) => unit = "removeEventListener"
}

include Impl({
  type t = t
})
