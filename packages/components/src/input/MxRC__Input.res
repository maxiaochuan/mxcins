module InputTwind = {
  open MxRC__Libs__Twind
  open Js.Array2

  let init = "
    inline-block
    relative
    m-0
    min-w-0
    w-full
    overflow-visible
    text(sm text)
    border(1 solid border)
    hover:(border-primary-hover)
    focus:(border-primary-hover shadow-input-focus)
    transition
    tabular-nums
    rounded
  "

  let make = (className, ~size, ~inGroup) => {
    let classes = [init]
    let push = str => classes->push(str)->ignore

    if inGroup {
      "z-1"->push
    }

    /* --- size --- */
    switch size {
    | #default => "h-8 px-3-bordered"
    | #small => "h-6 px-2-bordered"
    | #large => "h-10 px-3-bordered text-base"
    }->push
    /* --- size --- */

    switch (classes->apply->tw, className) {
    | (classes, Some(className)) => [classes, className]->joinWith(" ")
    | (classes, _) => classes
    }
  }
}

module InputGroup = MxRC__Input__Group

type style = MxRC__Libs__React.style
type node = MxRC__Libs__React.node

@react.component @genType
let make = React.forwardRef((~size=?,
~className=?,
~style: option<style>=?,
~placeholder=?,
~addonBefore: option<node>=?,
~addonAfter: option<node>=?,
//events
~onPressEnter: option<ReactEvent.Keyboard.t => unit>=?,
~onKeyDown: option<ReactEvent.Keyboard.t => unit>=?,
ref) => {
  // config context
  let context = React.useContext(MxRC__ConfigProvider.ConfigContext.ctx)

  // size
  let size = size->Belt.Option.getWithDefault(context.size)

  let inGroup = addonBefore->Belt.Option.isSome || addonAfter->Belt.Option.isSome
  let className = InputTwind.make(className, ~size, ~inGroup)

  let onKeyDown = event => {
    // press enter
    if event->ReactEvent.Keyboard.key === "Enter" {
      onPressEnter->Belt.Option.forEach(fn => event->fn)
    }

    onKeyDown->Belt.Option.forEach(fn => event->fn)
  }

  let child =
    <input
      ref=?{ref->Js.Nullable.toOption->Belt.Option.map(ReactDOM.Ref.domRef)}
      type_="text"
      className
      ?style
      ?placeholder
      onKeyDown
    />

  if inGroup {
    let before = switch addonBefore {
    | Some(before) => <InputGroup.InputGroupAddon> before </InputGroup.InputGroupAddon>
    | _ => React.null
    }
    let after = switch addonAfter {
    | Some(after) => <InputGroup.InputGroupAddon> after </InputGroup.InputGroupAddon>
    | _ => React.null
    }
    <InputGroup> before child after </InputGroup>
  } else {
    child
  }
})
