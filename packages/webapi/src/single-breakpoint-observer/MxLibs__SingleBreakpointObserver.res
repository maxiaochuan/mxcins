@genType
type breakpoint = [#xxl | #xl | #lg | #md | #sm | #xs]

@genType
let breakpoints: array<breakpoint> = [#xxl, #xl, #lg, #md, #sm, #xs]

module BreakpointCmp = Belt.Id.MakeComparable({
  type t = breakpoint
  let cmp = Pervasives.compare
})

let queries = Belt.Map.fromArray(
  [
    (#xs, "(max-width: 575px)"),
    (#sm, "(min-width: 576px)"),
    (#md, "(min-width: 768px)"),
    (#lg, "(min-width: 992px)"),
    (#xl, "(min-width: 1200px)"),
    (#xxl, "(min-width: 1600px)"),
  ],
  ~id=module(BreakpointCmp),
)

let screens = Belt.Map.fromArray(
  [(#xs, false), (#sm, false), (#md, false), (#lg, false), (#xl, false), (#xxl, false)],
  ~id=module(BreakpointCmp),
)

let token = ref(-1)

type cached = {
  mediaQueryList: Webapi.Dom.Window.mediaQueryList,
  handler: MxLibs__Dom.MediaQueryList.listener,
}
let store = Belt.MutableMap.String.fromArray([])

let subscribers = Belt.MutableMap.Int.fromArray([])

let register = () => {
  queries->Belt.Map.forEach((breakpoint, query) => {
    open MxLibs__Dom
    let handler = evt => {
      let matches = evt->MediaQueryList.ChangeEvent.matches
      screens->Belt.Map.set(breakpoint, matches)->ignore
      subscribers->Belt.MutableMap.Int.forEach((_, func) => screens->func)
    }
    let mediaQueryList = window->Window.matchMedia(query)
    mediaQueryList->MediaQueryList.addEventListener("change", handler)
    mediaQueryList->MediaQueryList.asChangeEvent->handler
    store->Belt.MutableMap.String.set(query, {mediaQueryList: mediaQueryList, handler: handler})
  })
}

let unregister = () => {
  queries->Belt.Map.forEach((_, query) => {
    store
    ->Belt.MutableMap.String.get(query)
    ->Belt.Option.forEach(cached => {
      open MxLibs__Dom
      let {mediaQueryList, handler} = cached
      mediaQueryList->MediaQueryList.removeEventListener("change", handler)
    })
  })
  subscribers->Belt.MutableMap.Int.clear
}

let subscribe = func => {
  if (subscribers->Belt.MutableMap.Int.size === 0) {
    ()->register
  }
  token := token.contents + 1
  subscribers->Belt.MutableMap.Int.set(token.contents, func)
  screens->func
  token.contents
}

let unsubscribe = id => {
  subscribers->Belt.MutableMap.Int.remove(id)
  if subscribers->Belt.MutableMap.Int.size === 0 {
    ()->unregister
  }
}
