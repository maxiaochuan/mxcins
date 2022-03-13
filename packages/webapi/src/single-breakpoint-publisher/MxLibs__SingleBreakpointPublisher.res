@genType
type breakpoint = [#xxl | #xl | #lg | #md | #sm | #xs]

@genType
let breakpoints: array<breakpoint> = [#xxl, #xl, #lg, #md, #sm, #xs]

module BreakpointCmp = Belt.Id.MakeComparable({
  type t = breakpoint
  let cmp = (a, b) => breakpoints->Js.Array2.indexOf(a) - breakpoints->Js.Array2.indexOf(b)
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

let screen = ref(None)

let token = ref(-1)

type cached = {
  mediaQueryList: Webapi.Dom.Window.mediaQueryList,
  handler: MxLibs__Dom.MediaQueryList.listener,
}

let store = Belt.MutableMap.String.fromArray([])

let subscribers = Belt.MutableMap.Int.fromArray([])

let start = () => {
  queries->Belt.Map.forEach((breakpoint, query) => {
    open MxLibs__Dom
    let handler = evt => {
      let matches = evt->MediaQueryList.ChangeEvent.matches
      if matches {
        screen.contents = breakpoint->Some
        subscribers->Belt.MutableMap.Int.forEach((_, func) => breakpoint->func)
      }
    }
    let mediaQueryList = window->Window.matchMedia(query)
    mediaQueryList->MediaQueryList.addEventListener("change", handler)
    mediaQueryList->MediaQueryList.asChangeEvent->handler
    store->Belt.MutableMap.String.set(query, {mediaQueryList: mediaQueryList, handler: handler})
  })
}

let close = () => {
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

@genType
let subscribe = func => {
  if subscribers->Belt.MutableMap.Int.size === 0 {
    ()->start
  }
  token := token.contents + 1
  subscribers->Belt.MutableMap.Int.set(token.contents, func)
  screen.contents->Belt.Option.forEach(func)
  token.contents
}

@genType
let unsubscribe = (id: int) => {
  subscribers->Belt.MutableMap.Int.remove(id)
  if subscribers->Belt.MutableMap.Int.size === 0 {
    ()->close
  }
}
