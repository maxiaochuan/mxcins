module Config = MxRC__ConfigProvider.ConfigContext
module Twind = MxRC__Button__Twind
module IconBody = MxRC__Button__IconBody
module Utils = MxRC__Button__Utils

@genType.as("ButtonType")
type htmlType = [#button | #submit | #reset]

@genType.as("ButtonType")
type _type = [#default | #primary | #dashed | #text | #link]

@genType.as("ButtonShapeType")
type shape = [#default | #circle | #round]

@react.component @genType
let make = React.forwardRef((
  ~htmlType: htmlType=#button,
  ~className=?,
  ~style=?,
  ~size=?,
  ~_type: _type=#default,
  ~shape: shape=#default,
  ~danger=false,
  ~block=false,
  ~disabled=false,
  ~ghost=false,
  ~loading=false,
  ~icon=?,
  ~children=?,
  ~onClick: option<ReactEvent.Mouse.t => unit>=?,
  ref,
) => {
  // size
  let size = size->Config.useSizeConfig

  // onclick
  let onClick = evt =>
    switch (onClick, disabled) {
    | (Some(onClick), false) => {
        evt->ReactEvent.Mouse.preventDefault
        evt->onClick->ignore
      }
    | (_, _) => ()
    }

  let iconOnly = children->Belt.Option.isNone && icon->Belt.Option.isSome

  // classname
  let className =
    className->MxRC__Button__Twind.make(
      ~size,
      ~_type,
      ~shape,
      ~danger,
      ~ghost,
      ~block,
      ~disabled,
      ~loading,
      ~iconOnly,
    )

  let icon = <IconBody iconOnly icon loading />

  let kids =
    children
    ->Belt.Option.getWithDefault(React.null)
    ->React.Children.map(child => {
      open MxRC__Libs__React.Children
      if child->isString || child->isNumber {
        if child->isString && child->asString->Utils.isTwoCNChar {
          let string = child->asString->Js.String2.split("")->Js.Array2.joinWith(" ")
          <span> {React.string(string)} </span>
        } else {
          <span> child </span>
        }
      } else {
        child
      }
    })

  let type_ = switch htmlType {
  | #button => "button"
  | #submit => "submit"
  | #reset => "reset"
  }

  <button
    ref=?{ref->Js.Nullable.toOption->Belt.Option.map(ReactDOM.Ref.domRef)}
    type_
    className
    ?style
    disabled
    onClick>
    icon kids
  </button>
})
