module InputTwind = {
  open MxRC__Libs__Twind
  open Js.Array2

  let init = "inline-block relative w-full m-0 border(1 gray-300) min-w-0 rounded-sm text(sm text) overflow-visible transition"

  let make = (className, ~size) => {
    let classes = [init]
    let push = str => classes->push(str)->ignore

    /* --- size --- */
    switch size {
    | #default => "h-8 px-3-bordered py-inline-bordered"
    | #small => "h-6 px-2-bordered py-inline-bordered-sm"
    | #large => "h-10 px-3-bordered py-inline-bordered-lg text-base"
    }->push
    /* --- size --- */

    switch (classes->apply->tw, className) {
    | (classes, Some(className)) => [classes, className]->joinWith(" ")
    | (classes, _) => classes
    }
  }
}

type style = MxRC__Libs__React.style

@react.component @genType
let make = (~className=?, ~style: option<style>=?, ~size, ~placeholder=?) => {
  // config context
  let context = React.useContext(MxRC__ConfigProvider.ConfigContext.ctx)

  // size
  let size = size->Belt.Option.getWithDefault(context.size)

  let className = InputTwind.make(className, ~size)

  <input type_="text" className ?style ?placeholder />
}
