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
  // ~className=?,
  // ~style: option<style>=?,
  ~placeholder=?,
  ~addonBefore=?,
) => {
  let addonAfter =
      <Button className={InputSearchTwind.makeSearch()} icon={<SearchOutlined />} />
  <Input ?size ?placeholder ?addonBefore addonAfter />
}
