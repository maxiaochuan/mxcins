module LayoutHeaderTwind = {
  open MxRC__Libs__Twind
  open Js.Array2

  let init = "h-16 px-12"

  let make = className => {
    let classes = [init]

    switch (classes->apply->tw, className) {
    | (classes, Some(className)) => [classes, className]->joinWith(" ")
    | (classes, _) => classes
    }
  }
}

@react.component @genType
let make = (~className=?, ~style=?, ~children=?) => {
  let className = LayoutHeaderTwind.make(className)
  let children = children->Belt.Option.getWithDefault(React.null)
  <header className ?style> children </header>
}
