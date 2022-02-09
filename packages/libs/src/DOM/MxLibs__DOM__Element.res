type t = Dom.element

module Impl = (
  T: {
    type t
  },
) => {
  @get external offsetWidth: T.t => int = "offsetWidth"

  @get external offsetHeight: T.t => int = "offsetHeight"

  @send external getBoundingClientRect: T.t => Dom.domRect = "getBoundingClientRect"
}

include Impl({
  type t = t
})
