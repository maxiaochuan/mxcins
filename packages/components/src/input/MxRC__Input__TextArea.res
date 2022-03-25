module Twind = MxRC__Input__Twind

@react.component @genType
let make = ( ~size=?, ~className=?, ~rows=?) => {
  // context size
  let context = React.useContext(MxRC__ConfigProvider.ConfigContext.ctx)
  let size = size->Belt.Option.getWithDefault(context.size)

  let className = className->Twind.makeTextArea(~size, ~focused=false)

  <textarea className ?rows />
}