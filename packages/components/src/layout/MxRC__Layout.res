module LayoutContext = {
  type sider = {add: string => unit, remove: string => unit}
  type context = {sider: sider}

  let ctx = React.createContext({sider: {add: _ => (), remove: _ => ()}})

  let make = (~add, ~remove) => {
    {sider: {add: add, remove: remove}}
  }

  module Provider = {
    let provider = React.Context.provider(ctx)
    @react.component
    let make = (~value: context, ~children) => {
      React.createElement(provider, {"value": value, "children": children})
    }
  }
}

module LayoutTwind = {
  open MxRC__Libs__Twind
  open Js.Array2

  let init = "flex flex-auto bg-background min-h-0"

  let make = (className, ~hasSider) => {
    let classes = [init]
    let push = str => classes->push(str)->ignore

    if hasSider {
      "flex-row"->push
      { "& > main": { "width": "0" }, "& > section": { "width": "0" } }->css->push
    } else {
      "flex-col"->push
    }
    (hasSider ? "flex-row" : "flex-col")->push

    switch (classes->apply->tw, className) {
    | (classes, Some(className)) => [classes, className]->joinWith(" ")
    | (classes, _) => classes
    }
  }
}

type style = MxRC__Libs__React.style

@react.component @genType
let make = (~className=?, ~style: option<style>=?, ~hasSider=?, ~children=?) => {
  let (siders, setSiders) = React.useState(_ => [])

  let value = React.useMemo0(() => {
    open Js.Array2
    LayoutContext.make(
      ~add=id => setSiders(prev => []->concat(prev)->concat([id])),
      ~remove=id => setSiders(prev => prev->filter(previd => previd !== id)),
    )
  })

  let hasSider = hasSider->Belt.Option.getWithDefault(false) || siders->Js.Array2.length > 0

  let className = LayoutTwind.make(className, ~hasSider)
  let children = children->Belt.Option.getWithDefault(React.null)

  <LayoutContext.Provider value>
    <section className ?style> children </section>
  </LayoutContext.Provider>
}
