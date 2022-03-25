open MxRC__Libs__Antd

module Input = MxRC__Input
module Button = MxRC__Button

module InputSearchTwind = {
  open MxRC__Libs__Twind
  let makeSearch = () => {
    ["rounded-l-none hover:(z-1) focus:(z-1) active:(z-1) text-text-secondary"]->atw
  }
}

let initRef: Input.forward = {
  focus: () => (),
  blur: () => (),
  input: None,
}

@react.component @genType
let make = (
  ~size=?,
  ~style as groupStyle=?,
  ~placeholder=?,
  ~addonBefore=?,
  ~prefix=?,
  ~suffix=?,
  ~onSearch: option<(. string, ReactEvent.Synthetic.t) => unit>=?,
) => {
  let inputRef: Input.inputRef = React.useRef(initRef)

  let onSearch = event =>
    onSearch->Belt.Option.forEach(fn =>
      inputRef.current.input->Belt.Option.forEach(input =>
        fn(. input->Webapi.Dom.HtmlInputElement.value, event)
      )
    )

  let addonAfter = {
    let className = InputSearchTwind.makeSearch()
    let icon = <SearchOutlined />
    let onClick = event => event->ReactEvent.toSyntheticEvent->onSearch

    <Button className icon onClick />
  }

  let onPressEnter = event => event->ReactEvent.toSyntheticEvent->onSearch

  <Input
    ref=inputRef
    ?size
    ?groupStyle
    ?placeholder
    ?addonBefore
    ?prefix
    ?suffix
    addonAfter
    addonAfterNoStyle=true
    onPressEnter
  />
}
