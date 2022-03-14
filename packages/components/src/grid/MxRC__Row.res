module RowContext = {
  open MxRC__Libs__Utils
  type gap = (BreakpointUtils.hash, BreakpointUtils.hash)
  type value = {gap: gap}

  let make = (~gap: gap): value => {gap: gap}

  let init = {gap: BreakpointUtils.makeBreakpointNumberHashArray()}
  let context = React.createContext(init)

  module Provider = {
    let provider = React.Context.provider(context)

    @react.component
    let make = (~value, ~children) => {
      React.createElement(provider, {"value": value, "children": children})
    }
  }
}

module GridRowTwind = {
  open MxRC__Libs__Twind
  open Js.Array2

  let init = "flex"

  let make = (className, ~wrap, ~justify, ~align, ~gap) => {
    "classes make"->Js.log4(wrap, justify, gap)
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

    let (n1, n2) = gap
    switch n1 {
    | 0 => ()
    | n => {"column-gap": `${n->Js.Int.toString}px;`}->css->push
    }
    switch n2 {
    | 0 => ()
    | n => {"row-gap": `${n->Js.Int.toString}px;`}->css->push
    }

    switch (classes->apply->tw, className) {
    | (classes, Some(className)) => [classes, className]->joinWith(" ")
    | (classes, _) => classes
    }
  }
}

type justify = [#start | #end | #center | #"space-between" | #"space-around"]
type align = [#start | #end | #center]
type gap = RowContext.gap
type style = MxRC__Libs__React.style

@react.component @genType
let make = (
  ~className=?,
  ~style: option<style>=?,
  ~wrap=true,
  ~justify=#start,
  ~align=#start,
  ~gap: 'gap,
  ~children=?,
) => {
  let gap = MxRC__Libs__Utils.BreakpointUtils.makeBreakpointNumberHashArray(gap)

  let screens = MxRC__Grid.useBreakpoint()
  let gap = MxRC__Libs__Utils.BreakpointUtils.getCurrentBreakpointValue(gap, screens)

  let className = GridRowTwind.make(className, ~wrap, ~justify, ~align, ~gap)
  let children = children->Belt.Option.getWithDefault(React.null)

  // let value = React.useMemo1(() => RowContext.make(~gap), [Js.Json.stringifyAny(gap)])

  // <RowContext.Provider value> <div className ?style> children </div> </RowContext.Provider>
  <div className ?style> children </div>
}
