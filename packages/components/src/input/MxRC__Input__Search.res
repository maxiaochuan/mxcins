open MxRC__Libs__Antd

module Input = MxRC__Input
module InputGroup = MxRC__Input__Group
module Button = MxRC__Button

module InputSearchTwind = {
  open MxRC__Libs__Twind
  let makeSearch = () => {
    ["rounded-l-none hover:(z-1) focus:(z-1) active:(z-1)"]->atw
  }
}

@react.component @genType
let make = (
  ~size=?,
  ~placeholder=?,
  ~addonBefore=?,
  ~onSearch: option<(. string, ReactEvent.Synthetic.t) => unit>=?,
) => {
  let inputRef: React.ref<Js.Nullable.t<Dom.htmlInputElement>> = React.useRef(Js.Nullable.null)

  let onSearch = event =>
    onSearch->Belt.Option.forEach(fn =>
      inputRef.current
      ->Js.Nullable.toOption
      ->Belt.Option.forEach(input => fn(. input->MxLibs__Dom.HtmlInputElement.value, event))
    )

  let addonAfter = {
    let className = InputSearchTwind.makeSearch()
    let icon = <SearchOutlined />
    let onClick = event => event->ReactEvent.toSyntheticEvent->onSearch

    <Button className icon onClick />
  }

  let onPressEnter = event => event->ReactEvent.toSyntheticEvent->onSearch

  <Input ref=inputRef ?size ?placeholder ?addonBefore addonAfter onPressEnter />
}
