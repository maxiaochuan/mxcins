open Belt.Option
open MxRC__Button__Utils

@genType.as("ButtonType")
type _type = [#default | #primary | #dashed | #text | #link]

@genType.as("ButtonShapeType")
type shape = [#default | #circle | #round]

type style = MxRC__React.style

type evt = ReactEvent.Mouse.t
type onClick = evt => unit

@react.component @genType
let make = React.forwardRef((
  ~className=?,
  ~style: option<style>=?,
  ~size=?,
  ~_type: _type=#default,
  ~shape: shape=#default,
  ~danger=false,
  ~block=false,
  ~disabled=false,
  ~ghost=false,
  ~children=?,
  ~onClick: option<onClick>=?,
  (),
  ref,
) => {
  // config context
  let context = React.useContext(MxRC__ConfigProvider.ConfigContext.ctx)

  // size
  let size = size->getWithDefault(context.size)

  // classname
  let className =
    className->MxRC__Button__Twind.make(~size, ~_type, ~shape, ~danger, ~ghost, ~block, ~disabled)

  // style
  let style = style->getWithDefault(ReactDOM.Style.make())

  // onclick
  let onClick = evt =>
    switch (onClick, disabled) {
    | (Some(onClick), false) => {
        evt->ReactEvent.Mouse.preventDefault
        evt->onClick->ignore
      }
    | (_, _) => ()
    }

  let rendered =
    children
    ->getWithDefault(React.null)
    ->React.Children.map(child => {
      open MxRC__React.Children
      if child->isString || child->isNumber {
        if child->isString && child->asString->isTwoCNChar {
          let string = child->asString->Js.String2.split("")->Js.Array2.joinWith(" ")
          <span> {React.string(string)} </span>
        } else {
          <span> child </span>
        }
      } else {
        child
      }
    })

  <button
    ref=?{Js.Nullable.toOption(ref)->Belt.Option.map(ReactDOM.Ref.domRef)}
    className
    style
    disabled
    onClick>
    rendered
  </button>
})
