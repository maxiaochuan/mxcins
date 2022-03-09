open Belt.Option
open MxRC__Button__Utils

module LoadingComponent = MxRC__Button__LoadingComponent

@genType.as("ButtonType")
type _type = [#default | #primary | #dashed | #text | #link]

@genType.as("ButtonShapeType")
type shape = [#default | #circle | #round]

type style = MxRC__Libs__React.style

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
  ~icon: option<React.element>=?,
  ~children: option<React.element>=?,
  ~onClick: option<onClick>=?,
  ~loading=false,
  ref,
) => {
  // config context
  let context = React.useContext(MxRC__ConfigProvider.ConfigContext.ctx)

  // size
  let size = size->getWithDefault(context.size)

  // onclick
  let onClick = evt =>
    switch (onClick, disabled) {
    | (Some(onClick), false) => {
        evt->ReactEvent.Mouse.preventDefault
        evt->onClick->ignore
      }
    | (_, _) => ()
    }

  let iconOnly = switch (children, icon) {
  | (None, Some(_)) => true
  | (_, _) => false
  }

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

  let icon = switch (icon, loading) {
  | (Some(icon), false) => icon
  | (_, _) => {
      let exist = switch icon {
      | None => false
      | _ => true
      }
      <LoadingComponent exist={exist} loading iconOnly />
    }
  }

  let kids =
    children
    ->getWithDefault(React.null)
    ->React.Children.map(child => {
      open MxRC__Libs__React.Children
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
    ref=?{ref->Js.Nullable.toOption->Belt.Option.map(ReactDOM.Ref.domRef)}
    className
    ?style
    disabled
    onClick>
    icon kids
  </button>
})
