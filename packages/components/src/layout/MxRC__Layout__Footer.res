module LayoutFooterTwind = {
  open MxRC__Twind
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
  let className = LayoutFooterTwind.make(className)
  let children = children->Belt.Option.getWithDefault(React.null)
  <footer className ?style> children </footer>
}
