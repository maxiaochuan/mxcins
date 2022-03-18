module GridRowTwind = {
  open MxRC__Libs__Twind
  open Js.Array2

  let init = "flex"

  let make = (className, ~wrap, ~justify, ~align, ~spacing) => {
    let classes = [init]
    let push = str => classes->push(str)->ignore

    (wrap ? "flex-wrap" : "flex-nowrap")->push

    switch justify {
    | #start => "justify-start"
    | #end => "justify-end"
    | #center => "justify-center"
    | #"spacing-between" => "justify-spacing-between"
    | #"spacing-around" => "justify-spacing-around"
    }->push

    switch align {
    | #start => "items-start"
    | #end => "items-end"
    | #center => "items-center"
    }->push

    let (x, y) = spacing
    switch x {
    | 0 => ()
    | n => {"column-gap": `${n->Js.Int.toString}px;`}->css->push
    }
    switch y {
    | 0 => ()
    | n => {"row-gap": `${n->Js.Int.toString}px;`}->css->push
    }

    switch (classes->apply->tw, className) {
    | (classes, Some(className)) => [classes, className]->joinWith(" ")
    | (classes, _) => classes
    }
  }
}

type justify = [#start | #end | #center | #"spacing-between" | #"spacing-around"]
type align = [#start | #end | #center]
// type gap = RowContext.gap
type style = MxRC__Libs__React.style

@react.component @genType
let make = (
  ~className=?,
  ~style: option<style>=?,
  ~wrap=true,
  ~justify=#start,
  ~align=#start,
  ~spacing: option<'spacing>=?,
  ~children=?,
) => {
  let spacingRef = React.useRef(spacing)
  let (screens, setScreens) = React.useState(_ => MxLibs__BreakpointSub.breakpoints)

  React.useLayoutEffect0(() => {
    let token = MxLibs__BreakpointSub.subscribe(screens => {
      if spacingRef.current->MxRC__Libs__Utils.BreakpointUtils.isBreakpointRecord {
        setScreens(_ => screens)
      }
    })

    let cleanup = () => MxLibs__BreakpointSub.unsubscribe(token)

    cleanup->Some
  })

  let spacing = MxRC__Libs__Utils.BreakpointUtils.makeSpacingByBreakpoints(
    spacingRef.current,
    screens,
  )

  let className = GridRowTwind.make(className, ~wrap, ~justify, ~align, ~spacing)
  let children = children->Belt.Option.getWithDefault(React.null)

  <div className ?style> children </div>
}
