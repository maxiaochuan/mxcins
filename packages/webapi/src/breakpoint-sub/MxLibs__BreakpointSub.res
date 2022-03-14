module QueryCacheList = {
  open Belt.MutableMap.String

  type mediaQueryList = MxLibs__Dom.Window.mediaQueryList
  type listener = MxLibs__Dom.MediaQueryList.listener

  type value = {mediaQueryList: mediaQueryList, listener: listener}

  let make = () => fromArray([])

  let set = (map, ~query, ~mediaQueryList, ~listener) =>
    map->set(query, {mediaQueryList: mediaQueryList, listener: listener})

  let forEach = forEach

  let clear = clear
}

module BreakpointPubSub = {
  type breakpoint = [#xxl | #xl | #lg | #md | #sm | #xs]
  let breakpoints: array<breakpoint> = [#xxl, #xl, #lg, #md, #sm, #xs]

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

  let subscribers = Belt.MutableMap.Int.fromArray([])

  let dispatch = subscriber =>
    screens.contents
    ->Belt.Map.findFirstBy((_, v) => v === true)
    ->Belt.Option.forEach(((screen, _)) => screen->subscriber)

  let cache = QueryCacheList.make()
  let register = () => {
    open MxLibs__Dom
    queries->Belt.Map.forEach((breakpoint, query) => {
      let listener = evt => {
        let matches = evt->MediaQueryList.ChangeEvent.matches
        screens := screens.contents->Belt.Map.set(breakpoint, matches)
        subscribers->Belt.MutableMap.Int.forEach((_, fn) => fn->dispatch)
      }
      let mediaQueryList = window->Window.matchMedia(query)
      mediaQueryList->MediaQueryList.addEventListener("change", listener)
      mediaQueryList->MediaQueryList.asChangeEvent->listener
      cache->QueryCacheList.set(~query, ~mediaQueryList, ~listener)
    })
  }
  let unregister = () => {
    open QueryCacheList
    cache->forEach((_, value) => {
      let {mediaQueryList, listener} = value
      mediaQueryList->MxLibs__Dom.MediaQueryList.removeEventListener("change", listener)
    })
    cache->clear
  }

  %%private(let index = ref(-1))
  let subscribe = subscriber => {
    if subscribers->Belt.MutableMap.Int.isEmpty {
      ()->register
    }
    index := index.contents + 1
    subscribers->Belt.MutableMap.Int.set(index.contents, subscriber)
    subscriber->dispatch
    index.contents
  }

  let unsubscribe = id => {
    subscribers->Belt.MutableMap.Int.remove(id)
    if subscribers->Belt.MutableMap.Int.isEmpty {
      ()->unregister
    }
  }
}

@genType
type breakpoint = BreakpointPubSub.breakpoint
@genType
let breakpoints = BreakpointPubSub.breakpoints

@genType
let subscribe = subscriber => subscriber->BreakpointPubSub.subscribe

@genType
let unsubscribe = (id: int) => id->BreakpointPubSub.unsubscribe