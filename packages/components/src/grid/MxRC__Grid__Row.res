module GridRowContext = {
  type context = {spacex: int}

  let ctx = React.createContext({spacex: 0})

  let make = (spacex: int) => {
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
type style = MxRC__Libs__React.style

type mspace = (
  array<(MxLibs__BreakpointSub.breakpoint, int)>,
  array<(MxLibs__BreakpointSub.breakpoint, int)>,
)

@react.component @genType
let make = (
  ~className=?,
  ~style: option<style>=?,
  ~wrap=true,
  ~justify=#start,
  ~align=#start,
  ~space: option<(int, int)>=?,
  ~mspace: option<mspace>=?,
  ~children=?,
) => {
  // space only initial
  let spaceRef = React.useRef(space)
  let mspaceRef = React.useRef(mspace)

  let (screens, setScreens) = React.useState(_ => MxLibs__BreakpointSub.breakpoints)

  React.useLayoutEffect0(() => {
    let token = MxLibs__BreakpointSub.subscribe(screens => {
      mspaceRef.current->Belt.Option.forEach(_ => setScreens(_ => screens))
    })

    let cleanup = () => MxLibs__BreakpointSub.unsubscribe(token)

    cleanup->Some
  })

  let space = switch (spaceRef.current, mspaceRef.current) {
  | (Some(space), Some(_)) => {
      Js.Console.warn("`space` or `mspace` only can be set one")
      space
    }
  | (Some(space), None) => space
  | (None, Some(mspace)) => {
      module Id = MxLibs__BreakpointSub.BreakpointPubSub.BreakpointCmp
      let (mx, my) = mspace
      let mx = Belt.Map.fromArray(mx, ~id=module(Id))
      let my = Belt.Map.fromArray(my, ~id=module(Id))
      let mx = mx->Belt.Map.findFirstBy((k, _) => screens->Js.Array2.includes(k))
      let my = my->Belt.Map.findFirstBy((k, _) => screens->Js.Array2.includes(k))

      let mx = mx->Belt.Option.map(((_, v)) => v)
      let my = my->Belt.Option.map(((_, v)) => v)

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

  let value = React.useMemo1(() => spacex->GridRowContext.make, [spacex])

  let className = GridRowTwind.make(className, ~wrap, ~justify, ~align)
  let children = children->Belt.Option.getWithDefault(React.null)

  <GridRowContext.Provider value> <div className ?style> children </div> </GridRowContext.Provider>
}
