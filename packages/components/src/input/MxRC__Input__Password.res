open MxRC__Libs__Antd
module Input = MxRC__Input

@react.component @genType
let make = (~placeholder=?, ~disabled) => {
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

  <Input _type={visible ? #text : #password} ?placeholder suffix disabled />
}
