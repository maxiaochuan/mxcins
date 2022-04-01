open MxRC__Antd

module Input = MxRC__Input
module Button = MxRC__Button

module InputSearchTwind = {
  open MxRC__Twind
  let makeSearch = () => {
    ["rounded-l-none hover:(z-1) focus:(z-1) active:(z-1) text-text-secondary"]->atw
  }
}

@react.component @genType
let make = (
  ~size=?,
  ~style as groupStyle=?,
  ~placeholder=?,
  ~addonBefore=?,
  ~prefix=?,
  ~suffix=?,
  ~value=?,
  ~onChange=?,
  ~allowClear=?,
  ~onSearch: option<(. string, ReactEvent.Synthetic.t) => unit>=?,
  ~loading=false,
  ~disabled=false,
) => {
  let inputRef = React.useRef(Js.Nullable.null)

  let onChange = event => {
    // on reset
    if event->ReactEvent.Form.type_ === "click" {
      onSearch->Belt.Option.forEach(fn => {
        let target = event->ReactEvent.Form.target
        fn(. target["value"], event->ReactEvent.toSyntheticEvent)
      })
    }
    onChange->Belt.Option.forEach(fn => event->fn)
  }

  let onSearch = event =>
    onSearch->Belt.Option.forEach(fn =>
      inputRef.current
      ->Js.Nullable.toOption
      ->Belt.Option.forEach(input => fn(. input->Webapi.Dom.HtmlInputElement.value, event))
    )

  let addonAfter = {
    let className = InputSearchTwind.makeSearch()
    let icon = <SearchOutlined />
    let onClick = event => event->ReactEvent.toSyntheticEvent->onSearch

    <Button loading className icon onClick />
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
    ?allowClear
    ?value
    onChange
    addonAfter
    addonAfterNoStyle=true
    onPressEnter
    disabled
  />
}
