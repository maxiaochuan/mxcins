open MxRC__Libs__Antd

module Input = MxRC__Input
module Button = MxRC__Button

type style = MxRC__Libs__React.style

module InputSearchTwind = {
  open MxRC__Libs__Twind
  open Js.Array2

  let make = (className, ~size, ~inGroup) => {
    // let classes = [init]
    // let push = str => classes->push(str)->ignore

    // if inGroup {
    //   "z-1"->push
    // }

    // /* --- size --- */
    // switch size {
    // | #default => "h-8 px-3-bordered"
    // | #small => "h-6 px-2-bordered"
    // | #large => "h-10 px-3-bordered text-base"
    // }->push
    // /* --- size --- */

    // switch (classes->apply->tw, className) {
    // | (classes, Some(className)) => [classes, className]->joinWith(" ")
    // | (classes, _) => classes
    // }
    ()
  }

}

@react.component @genType
let make = (
  ~size=?,
  ~className=?,
  ~style: option<style>=?,
  ~placeholder=?,
  ~addonBefore: option<MxRC__Libs__React.node>=?,
) => {

  let addonAfter = <Button icon={<SearchOutlined />} />

  <Input ?className ?style ?placeholder ?addonBefore addonAfter ?size></Input>
}