open MxRC__Libs__Antd

module Input = MxRC__Input
module InputGroup = MxRC__Input__Group
module Button = MxRC__Button

type style = MxRC__Libs__React.style

module InputSearchTwind = {
  open MxRC__Libs__Twind
  // open Js.Array2

  let makeSearch = () => {
    ["rounded-l-none hover:(z-1) focus:(z-1) active:(z-1)"]->atw
  }
}

@react.component @genType
let make = (
  ~size=?,
  ~placeholder=?,
  ~addonBefore=?,
  ~onSearch: option<(string, ReactEvent.Synthetic.t) => unit>=?,
) => {
  let inputRef = React.useRef(Js.Nullable.null)

  let onSearch = event => {
    onSearch->Belt.Option.forEach(fn => {
      let input = inputRef.current
      input
      ->Js.Nullable.toOption
      ->Belt.Option.forEach(input => {
        let v: option<string> = input["value"]
        v->Belt.Option.getWithDefault("")->fn(event)
      })
    })
  }

  let onPressEnter = event => event->ReactEvent.toSyntheticEvent->onSearch

  let addonAfter = {
    let className = InputSearchTwind.makeSearch()
    let icon = <SearchOutlined />
    let onClick = event => event->ReactEvent.toSyntheticEvent->onSearch

    <Button className icon onClick />
  }

  <Input ref=inputRef ?size ?placeholder ?addonBefore addonAfter onPressEnter />
}
