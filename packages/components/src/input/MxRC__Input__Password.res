open MxRC__Antd
module Input = MxRC__Input

@react.component @genType
let make = React.forwardRef((
  ~className=?,
  ~placeholder=?,
  ~disabled=?,
  ~name=?,
  ~onChange=?,
  ~onBlur=?,
  ~id=?,
  ~autoComplete=?,
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
    ?className
    ?placeholder
    suffix
    ?disabled
    ?name
    ?onChange
    ?onBlur
    ?id
    ?autoComplete
  />
})
