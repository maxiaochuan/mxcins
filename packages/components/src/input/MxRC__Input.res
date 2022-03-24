module InputTwind = {
  open MxRC__Libs__Twind
  open Js.Array2

  let init = "
    inline-block
    relative
    w-full
    m-0
    min-w-0
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

  let makeAddon = () => {
    [
      "
        relative
        table-cell
        px-3-bordered
        font-normal
        text(sm center text)
        bg(background)
        border-border
        transition
      ",
    ]
    ->apply
    ->tw
  }

  let makeGroup = () => {
    [
      "table",
      {
        "& > :first-child": ["border(l t b) rounded-l"]->apply,
        "& > :last-child": ["border(r t b) rounded-r"]->apply,
        "& > :not(:first-child)": ["rounded-l-none"]->apply,
        "& > :not(:last-child)": ["rounded-r-none"]->apply,
      }->css,
    ]
    ->apply
    ->tw
  }
}

type style = MxRC__Libs__React.style

@react.component @genType
let make = (
  ~size=?,
  ~className=?,
  ~style: option<style>=?,
  ~placeholder=?,
  ~addonBefore: option<MxRC__Libs__React.node>=?,
  ~addonAfter: option<MxRC__Libs__React.node>=?,
) => {
  // config context
  let context = React.useContext(MxRC__ConfigProvider.ConfigContext.ctx)

  // size
  let size = size->Belt.Option.getWithDefault(context.size)

  let inGroup = addonBefore->Belt.Option.isSome || addonAfter->Belt.Option.isSome
  let className = InputTwind.make(className, ~size, ~inGroup)

  let child = <input type_="text" className ?style ?placeholder />

  if inGroup {
    let before = switch addonBefore {
    | Some(node) => <span className={InputTwind.makeAddon()}> node </span>
    | _ => React.null
    }
    let after = switch addonAfter {
    | Some(node) => <span className={InputTwind.makeAddon()}> node </span>
    | _ => React.null
    }
    <span className={InputTwind.makeGroup()}> before child after </span>
  } else {
    child
  }
}
