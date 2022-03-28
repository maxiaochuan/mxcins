module GridRowContext = {
  type context = {spacex: int}

  let ctx = React.createContext({spacex: 0})

  let make = (~spacex: int) => {
    {spacex: spacex}
  }

  module Provider = {
    let provider = React.Context.provider(ctx)
    @react.component
    let make = (~value: context, ~children) => {
      React.createElement(provider, {"value": value, "children": children})
    }
  }
}

module GridRowTwind = {
  open MxRC__Libs__Twind
  open Js.Array2

  let init = "flex"

  let make = (className, ~wrap, ~justify, ~align) => {
    let classes = [init]
    let push = str => classes->push(str)->ignore

    (wrap ? "flex-wrap" : "flex-nowrap")->push

    switch justify {
    | #start => "justify-start"
    | #end => "justify-end"
    | #center => "justify-center"
    | #"space-between" => "justify-space-between"
    | #"space-around" => "justify-space-around"
    }->push

    switch align {
    | #start => "items-start"
    | #end => "items-end"
    | #center => "items-center"
    }->push

    switch (classes->apply->tw, className) {
    | (classes, Some(className)) => [classes, className]->joinWith(" ")
    | (classes, _) => classes
    }
  }
}

type justify = [#start | #end | #center | #"space-between" | #"space-around"]
type align = [#start | #end | #center]

type mspace = (
  array<(MxWebapi.BreakpointSub.breakpoint, int)>,
  array<(MxWebapi.BreakpointSub.breakpoint, int)>,
)

@react.component @genType
let make = (
  ~className=?,
  ~style=?,
  ~wrap=true,
  ~justify=#start,
  ~align=#start,
  ~space: option<(int, int)>=?,
  ~dynamicSpace: option<mspace>=?,
  ~children=?,
) => {
  // space only initial
  let spaceRef = React.useRef(space)
  let dynamicSpaceRef = React.useRef(dynamicSpace)

  let (screens, setScreens) = React.useState(_ => MxWebapi.BreakpointSub.breakpoints)

  React.useLayoutEffect0(() => {
    let token = MxWebapi.BreakpointSub.subscribe(screens => {
      dynamicSpaceRef.current->Belt.Option.forEach(_ => setScreens(_ => screens))
    })

    let cleanup = () => MxWebapi.BreakpointSub.unsubscribe(token)

    cleanup->Some
  })

  let space = switch (spaceRef.current, dynamicSpaceRef.current) {
  | (Some(space), Some(_)) => {
      Js.Console.warn("`space` or `dynamic space` only can be set one")
      space
    }
  | (Some(space), None) => space
  | (None, Some(space)) => {
      module Id = MxWebapi.BreakpointSub.BreakpointPubSub.BreakpointCmp
      open Belt.Map
      let (mx, my) = space
      let mx =
        fromArray(mx, ~id=module(Id))
        ->findFirstBy((k, _) => screens->Js.Array2.includes(k))
        ->Belt.Option.map(((_, v)) => v)
      let my =
        fromArray(my, ~id=module(Id))
        ->findFirstBy((k, _) => screens->Js.Array2.includes(k))
        ->Belt.Option.map(((_, v)) => v)

      (mx->Belt.Option.getWithDefault(0), my->Belt.Option.getWithDefault(0))
    }
  | (None, None) => (0, 0)
  }

  let (spacex, spacey) = space
  let style = switch spacey {
  | 0 => style
  | n =>
    style
    ->Belt.Option.getWithDefault(ReactDOM.Style.make())
    ->ReactDOM.Style.combine(ReactDOM.Style.make(~gridRowGap=`${n->Js.Int.toString}px`, ()))
    ->Some
  }

  let value = React.useMemo1(() => GridRowContext.make(~spacex), [spacex])

  let className = GridRowTwind.make(className, ~wrap, ~justify, ~align)
  let children = children->Belt.Option.getWithDefault(React.null)

  <GridRowContext.Provider value> <div className ?style> children </div> </GridRowContext.Provider>
}
