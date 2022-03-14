module QueryDataSet = {
  open Belt.MutableMap.String

  type value = {
    mediaQueryList: MxLibs__Dom.Window.mediaQueryList,
    listener: MxLibs__Dom.MediaQueryList.listener,
  }

  let make = () => fromArray([])

  let save = (map, ~query, ~mediaQueryList, ~listener) =>
    map->set(query, {mediaQueryList: mediaQueryList, listener: listener})
}

module BreakpointPublisher = {
  @genType
  type breakpoint = [#xxl | #xl | #lg | #md | #sm | #xs]

  @genType
  let breakpoints: array<breakpoint> = [#xxl, #xl, #lg, #md, #sm, #xs]

  let dataset = QueryDataSet.make()

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
    screens.contents
    ->Belt.Map.findFirstBy((_, v) => v === true)
    ->Belt.Option.forEach(((screen, _)) => screen->fn)

  let register = onchange => {
    queries->Belt.Map.forEach((breakpoint, query) => {
      open MxLibs__Dom
      let listener = evt => {
        let matches = evt->MediaQueryList.ChangeEvent.matches
        screens := screens.contents->Belt.Map.set(breakpoint, matches)
        onchange->dispatch
      }
      let mediaQueryList = window->Window.matchMedia(query)
      mediaQueryList->MediaQueryList.addEventListener("change", listener)
      dataset->QueryDataSet.save(~query, ~mediaQueryList, ~listener)
      mediaQueryList->MediaQueryList.asChangeEvent->listener
    })
  }

  let unregister = () => {
    queries->Belt.Map.forEach((_, query) => {
      dataset
      ->Belt.MutableMap.String.get(query)
      ->Belt.Option.forEach(cached => {
        open MxLibs__Dom
        let {mediaQueryList, listener} = cached
        mediaQueryList->MediaQueryList.removeEventListener("change", listener)
      })
    })
  }
}

%%private(let token = ref(-1))
%%private(let subscribers = Belt.MutableMap.Int.fromArray([]))
@genType
let breakpoints = BreakpointPublisher.breakpoints

@genType
let subscribe = subscriber => {
  if subscribers->Belt.MutableMap.Int.size === 0 {
    BreakpointPublisher.register(screen => {
      subscribers->Belt.MutableMap.Int.forEach((_, fn) => screen->fn)
    })
  }
  token := token.contents + 1
  subscribers->Belt.MutableMap.Int.set(token.contents, subscriber)
  BreakpointPublisher.dispatch(subscriber)
  token.contents
}

@genType
let unsubscribe = (id: int) => {
  subscribers->Belt.MutableMap.Int.remove(id)
  if subscribers->Belt.MutableMap.Int.size === 0 {
    ()->BreakpointPublisher.unregister
  }
}
