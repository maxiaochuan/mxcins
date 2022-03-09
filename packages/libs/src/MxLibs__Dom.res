include Webapi.Dom

module MxElement = {
  include Webapi.Dom.Element

  @get external offsetHeight: t => int = "offsetHeight" /* experimental */
  @get external offsetLeft: t => int = "offsetLeft" /* experimental */
  @get external offsetTop: t => int = "offsetTop" /* experimental */
  @get external offsetWidth: t => int = "offsetWidth" /* experimental */
}
