module MediaQueryList = {
  type t = Webapi.Dom.Window.mediaQueryList

  module ChangeEvent = {
    type t
    @get external matches: t => bool = "matches"
  }

  external asChangeEvent: t => ChangeEvent.t = "%identity"

  type listener = ChangeEvent.t => unit

  @send
  external addEventListener: (t, string, ChangeEvent.t => unit) => unit = "addEventListener"

  @send
  external removeEventListener: (t, string, ChangeEvent.t => unit) => unit = "addEventListener"
}

module QueryCacheList = {
  open Belt.MutableMap.String

  type mediaQueryList = MediaQueryList.t
  type listener = MediaQueryList.ChangeEvent.t => unit

  type value = {mediaQueryList: mediaQueryList, listener: listener}

  let make = () => fromArray([])

  let set = (map, ~query, ~mediaQueryList, ~listener) => map->set(query, {mediaQueryList, listener})

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
    ->Belt.Map.toArray
    ->Js.Array2.filter(((_, v)) => v === true)
    ->Js.Array2.map(((k, _)) => k)
    ->subscriber

  let cache = QueryCacheList.make()
  let register = () => {
    queries->Belt.Map.forEach((breakpoint, query) => {
      let listener = evt => {
        let matches = evt->MediaQueryList.ChangeEvent.matches
        screens := screens.contents->Belt.Map.set(breakpoint, matches)
        subscribers->Belt.MutableMap.Int.forEach((_, subscriber) => subscriber->dispatch)
      }
      let mediaQueryList = Webapi.Dom.window->Webapi.Dom.Window.matchMedia(query)
      mediaQueryList->MediaQueryList.addEventListener("change", listener)
      mediaQueryList->MediaQueryList.asChangeEvent->listener
      cache->QueryCacheList.set(~query, ~mediaQueryList, ~listener)
    })
  }
  let unregister = () => {
    open QueryCacheList
    cache->forEach((_, value) => {
      let {mediaQueryList, listener} = value
      mediaQueryList->MediaQueryList.removeEventListener("change", listener)
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

@genType.as("BreakpointType")
type breakpoint = BreakpointPubSub.breakpoint
@genType
let breakpoints = BreakpointPubSub.breakpoints
@genType
type subscriber = Js.Array2.t<breakpoint> => unit

@genType
let subscribe = subscriber => subscriber->BreakpointPubSub.subscribe

@genType
let unsubscribe = (id: int) => id->BreakpointPubSub.unsubscribe
