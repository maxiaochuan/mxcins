module LayoutContentTwind = {
  open MxRC__Twind
  open Js.Array2

  let init = "flex-auto min-h-0"

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
  let className = LayoutContentTwind.make(className)
  let children = children->Belt.Option.getWithDefault(React.null)
  <main className ?style> children </main>
}
