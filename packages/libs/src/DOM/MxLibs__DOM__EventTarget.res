type t = Dom.eventTarget

module Mixin = (
  T: {
    type t
  },
) => {
  external asEventTarget: T.t => Dom.eventTarget = "%identity"

  @send
  external addEventListener: (T.t, string, Dom.event => unit) => unit = "addEventListener"

  @send
  external removeEventListener: (T.t, string, Dom.event => unit) => unit = "removeEventListener"
}

include Mixin({
  type t = t
})
