module QueryListDispatcher = {
  @genType
  type breakpoint = [#xxl | #xl | #lg | #md | #sm | #xs]

  @genType
  let breakpoints: array<breakpoint> = [#xxl, #xl, #lg, #md, #sm, #xs]

  type cached = {
    mediaQueryList: Webapi.Dom.Window.mediaQueryList,
    handler: MxLibs__Dom.MediaQueryList.listener,
  }

  let store = Belt.MutableMap.String.fromArray([])

  module BreakpointCmp = Belt.Id.MakeComparable({
    type t = breakpoint
    let cmp = (a, b) => breakpoints->Js.Array2.indexOf(a) - breakpoints->Js.Array2.indexOf(b)
  })

  let queries = Belt.Map.fromArray(
    [
      (#xs, "(min-width: 0px)"),
      (#sm, "(min-width: 576px)"),
      (#md, "(min-width: 768px)"),
      (#lg, "(min-width: 992px)"),
      (#xl, "(min-width: 1200px)"),
      (#xxl, "(min-width: 1600px)"),
    ],
    ~id=module(BreakpointCmp),
  )

  let screens = ref(
    Belt.Map.fromArray(
      [(#xs, false), (#sm, false), (#md, false), (#lg, false), (#xl, false), (#xxl, false)],
      ~id=module(BreakpointCmp),
    ),
  )

  let dispatch = fn =>
    screens.contents->Belt.Map.findFirstBy((_, v) => v === true)->Belt.Option.forEach(fn)

  let register = onchange => {
    queries->Belt.Map.forEach((breakpoint, query) => {
      open MxLibs__Dom
      let handler = evt => {
        let matches = evt->MediaQueryList.ChangeEvent.matches
        screens := screens.contents->Belt.Map.set(breakpoint, matches)
        screens.contents->Belt.Map.findFirstBy((_, v) => v === true)->Belt.Option.forEach(onchange)
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
  }
}

let token = ref(-1)

let subscribers = Belt.MutableMap.Int.fromArray([])

@genType
let subscribe = subscriber => {
  if subscribers->Belt.MutableMap.Int.size === 0 {
    QueryListDispatcher.register(screen => {
      subscribers->Belt.MutableMap.Int.forEach((_, fn) => screen->fn)
    })
  }
  token := token.contents + 1
  subscribers->Belt.MutableMap.Int.set(token.contents, subscriber)
  QueryListDispatcher.dispatch(subscriber)
  token.contents
}

@genType
let unsubscribe = (id: int) => {
  subscribers->Belt.MutableMap.Int.remove(id)
  if subscribers->Belt.MutableMap.Int.size === 0 {
    ()->QueryListDispatcher.unregister
  }
}
