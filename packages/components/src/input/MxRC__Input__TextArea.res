module Twind = MxRC__Input__Twind
module Config = MxRC__ConfigProvider.ConfigContext

@react.component @genType
let make = (
  ~size=?,
  ~className=?,
  ~rows=?,
  ~placeholder=?,
  ~maxLength=?,
  ~value=?,
  ~defaultValue=?,
  ~onChange=?,
  ~disabled=false,
) => {
  // context size
  let size = size->Config.useSizeConfig

  // value state
  let (v, set) = React.useState(_ => defaultValue->Belt.Option.getWithDefault(""))
  let isControled = !(value->Belt.Option.isNone)
  let value = value->Belt.Option.getWithDefault(v)

  // onchange
  let onChange = event => {
    open ReactEvent.Synthetic
    let target = event->target
    let next: option<string> = target["value"]
    let v = next->Belt.Option.getWithDefault("")

    let enabled = switch maxLength {
    | None => true
    | Some(maxLength) => maxLength + 1 > v->Js.String2.length
    }

    if enabled {
      if !isControled {
        set(_ => v)
      }
      onChange->Belt.Option.forEach(fn => event->fn)
    }
  }

  let className = className->Twind.makeTextArea(~size, ~focused=false, ~disabled)

  <textarea className ?placeholder ?rows value onChange disabled />
}
