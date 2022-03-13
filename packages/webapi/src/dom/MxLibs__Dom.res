include Webapi.Dom

module MxElement = {
  include Webapi.Dom.Element

  @get external offsetHeight: t => int = "offsetHeight" /* experimental */
  @get external offsetLeft: t => int = "offsetLeft" /* experimental */
  @get external offsetTop: t => int = "offsetTop" /* experimental */
  @get external offsetWidth: t => int = "offsetWidth" /* experimental */
}

module MediaQueryList = {
  type t = Webapi.Dom.Window.mediaQueryList

  module ChangeEvent = {
    type t
    @get external matches: t => bool = "matches"
  }

  external asChangeEvent: t => ChangeEvent.t = "%identity"

  type listener = ChangeEvent.t => unit

  @send
  external addEventListener: (t, string, listener) => unit = "addEventListener"

  @send
  external removeEventListener: (t, string, listener) => unit = "addEventListener"
}
