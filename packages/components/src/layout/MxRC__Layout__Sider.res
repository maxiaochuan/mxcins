type style = MxRC__Libs__React.style

module LayoutSiderTwind = {
  open MxRC__Libs__Twind
  open Js.Array2

  let init = "relative min-w-0 transition-all"

  let make = className => {
    // let width = width->Js.Int.toString
    let classes = [
      init,
      {
        "& > div": {
          "height": "100%",
          "marginTop": "-0.1.px",
          "paddingTop": "0.1.px",
        },
      }->css,
    ]

    switch (classes->apply->tw, className) {
    | (classes, Some(className)) => [classes, className]->joinWith(" ")
    | (classes, _) => classes
    }
  }
}

@react.component @genType
let make = (
  ~className=?,
  ~style: option<style>=?,
  ~width=200,
  ~collapsed=false,
  ~collapsedWidth=80,
  ~children=?,
) => {
  let context = React.useContext(MxRC__Layout.LayoutContext.ctx)

  React.useEffect1(() => {
    let id = "sider-" ++ MxRC__Libs__Utils.nanoid()

    id->context.sider.add

    let cleanup = () => id->context.sider.remove
    cleanup->Some
  }, [context])

  let width = (collapsed ? collapsedWidth : width)->Js.Int.toString ++ "px"
  let style =
    ReactDOM.Style.make(
      ~flex="0 0 " ++ width,
      ~width,
      ~minWidth=width,
      ~maxWidth=width,
      (),
    )->ReactDOM.Style.combine(style->Belt.Option.getWithDefault(ReactDOM.Style.make()))

  let className = LayoutSiderTwind.make(className)
  let children = children->Belt.Option.getWithDefault(React.null)

  <aside className style> <div> children </div> </aside>
}
