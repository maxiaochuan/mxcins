module Mixin = (
  T: {
    type t
  },
) => {
  @send
  external appendChild: (T.t, ~child: Dom.node_like<'a>) => unit = "appendChild"
}

type t = Dom.node

include Mixin({
  type t = t
})
