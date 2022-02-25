module Mixin = (
  T: {
    type t
  },
) => {
  @send external addEventListener: (T.t, string, Dom.event => unit) => unit = "addEventListener"

  @send
  external removeEventListener: (T.t, string, Dom.event => unit) => unit = "removeEventListener"
}
