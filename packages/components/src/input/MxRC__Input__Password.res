open MxRC__Antd
module Input = MxRC__Input

@genType.import(("react", "ReactNode"))
type node = React.element

@react.component @genType
let make = React.forwardRef((
  ~size=?,
  ~className=?,
  ~placeholder=?,
  ~prefix: option<node>=?,
  ~disabled=?,
  ~name=?,
  ~onChange=?,
  ~onBlur=?,
  ~id=?,
  ~autoComplete=?,
  ~onMouseEnter: option<ReactEvent.Mouse.t => unit>=?,
  ~onMouseLeave: option<ReactEvent.Mouse.t => unit>=?,
  ref,
) => {
  let (visible, set) = React.useState(_ => false)

  let onMouseDown = event => {
    event->ReactEvent.Mouse.preventDefault
  }

  let onMouseUp = event => {
    event->ReactEvent.Mouse.preventDefault
  }

  let onClick = _ => {
    set(prev => !prev)
  }

  let suffix = visible
    ? <EyeOutlined onMouseDown onMouseUp onClick />
    : <EyeInvisibleOutlined onMouseDown onMouseUp onClick />

  <Input
    ref
    _type={visible ? #text : #password}
    ?size
    ?className
    ?placeholder
    ?prefix
    suffix
    ?disabled
    ?name
    ?onChange
    ?onBlur
    ?id
    ?autoComplete
    ?onMouseEnter
    ?onMouseLeave
  />
})
