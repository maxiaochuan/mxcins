type _type = [#default | #primary | #dashed | #text]

module Style = {
  open MxRC__Libs__Twind
  let init = "
    relative
    inline
    font-normal
    text(base center text)
    whitespace-nowrap
    border(1 gray-300)
    rounded
    px-3
    transition
    disabled:cursor-not-allowed
    disabled:text(gray-400 hover:gray-400 focus:gray-400 active:gray-400)
    disabled:bg(gray-100 hover:gray-100 focus:gray-100 active:gray-100)
    disabled:border(gray-300 hover:gray-300 focus:gray-300 active:gray-300)
  "

  let def = "
    text(hover:primary-hover focus:primary-hover active:primary-active)
    border(hover:primary-hover focus:primary-hover active:primary-active)
  "

  let primary = "
    text-white
    bg(primary hover:primary-hover focus:primary-hover active:primary-active)
    border(primary hover:primary-hover focus:primary-hover active:primary-active)
  "

  let text = "
    border-none
    disabled:bg(initial hover:initial focus:initial active:initial)
  "

  let dashed = `${def} border-dashed`

  let danger = "danger hover:danger-hover focus:danger-hover active:danger-active"

  let make = (~size, ~_type, ~danger as d, ~block, ~disabled) => {
    let ret = switch (_type, d) {
    | (#default, false) => [init, def]
    | (#default, true) => [init, `text(${danger})`, `border(${danger})`]
    | (#primary, false) => [init, primary]
    | (#primary, true) => [init, primary, `bg(${danger})`, `border(${danger})`]
    | (#text, false) => [init, text]
    | (#text, true) => [init, text, `text(${danger})`]
    | (#dashed, false) => [init, dashed, "border-dashed"]
    | (#dashed, true) => [init, dashed, `text(${danger})`, `border(${danger})`]
    | (_, _) => [init]
    }
    open Js.Array2

    if block {
      let _ = ret->push("w-full")
    }

    let _ = switch size {
    | #default => ret->push("h-8")
    | #small => ret->push("h-6")
    | #large => ret->push("h-10")
    }

    ret->apply->tw
  }
}

@react.component
let make = (
  ~_type=#default,
  ~size=?,
  ~danger=false,
  ~block=false,
  ~disabled=false,
  ~children: React.element=React.null,
) => {
  let context = React.useContext(MxRC__ConfigProvider.ConfigContext.ctx)

  let size = switch size {
  | Some(size) => size
  | _ => context.size
  }
  let className = Style.make(~size, ~_type, ~danger, ~block, ~disabled)

  <button className={className} disabled> children </button>
}
