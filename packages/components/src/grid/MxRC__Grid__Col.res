module GridColTwind = {
  open MxRC__Libs__Twind
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

type style = MxRC__Libs__React.style

@react.component @genType
let make = (~className=?, ~style: option<style>=?, ~span=?, ~children=?) => {
  let context = React.useContext(MxRC__Grid__Row.GridRowContext.ctx)

  let className = GridColTwind.make(className, ~span)
  let children = children->Belt.Option.getWithDefault(React.null)

  let style = switch context.spacex {
  | 0 => style
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
    ->Some
  }

  <div className ?style> children </div>
}
