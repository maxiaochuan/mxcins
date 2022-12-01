module GridColTwind = {
  open MxRC__Twind
  let init = "block"
  let make = (className, ~span) => {
    open Js.Array2
    let classes = [init]

    span->Belt.Option.forEach(span => {
      classes->push(`w-${span->Js.Int.toString}/24`)->ignore
    })

    switch (classes->apply->tw, className) {
    | (classes, Some(className)) => [classes, className]->joinWith(" ")
    | (classes, _) => classes
    }
  }
}

@react.component @genType
let make = (~className=?, ~style=?, ~span=?, ~flex=?, ~children=?) => {
  let context = React.useContext(MxRC__Grid__Row.GridRowContext.ctx)

  let className = GridColTwind.make(className, ~span)
  let children = children->Belt.Option.getWithDefault(React.null)

  let style = switch context.spacex {
  | 0 => style->Belt.Option.getWithDefault(ReactDOM.Style.make())
  | n =>
    style
    ->Belt.Option.getWithDefault(ReactDOM.Style.make())
    ->ReactDOM.Style.combine(
      ReactDOM.Style.make(
        ~paddingLeft=`${(n / 2)->Js.Int.toString}px`,
        ~paddingRight=`${(n / 2)->Js.Int.toString}px`,
        (),
      ),
    )
  }

  let style = switch flex {
  | Some(flex) => {
      let f = {
        if %re("/^\d+$/")->Js.Re.test_(flex) {
          `${flex} ${flex} auto`
        } else if %re("/^\d+(\.\d+)?(px|em|rem|%)$/")->Js.Re.test_(flex) {
          `0 0 ${flex}`
        } else {
          flex
        }
      }
      style->ReactDOM.Style.combine(ReactDOM.Style.make(~flex=f, ()))
    }

  | _ => style
  }

  <div className style> children </div>
}
