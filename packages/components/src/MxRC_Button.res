@genType.as("ButtonType")
type _type = [#default | #primary | #dashed | #text | #link]

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
  "

  let disabled = "
    disabled:cursor-not-allowed
    disabled:text(gray-400 hover:gray-400 focus:gray-400 active:gray-400)
    disabled:bg(gray-100 hover:gray-100 focus:gray-100 active:gray-100)
    disabled:border(gray-300 hover:gray-300 focus:gray-300 active:gray-300)
  "

  let def = "
    text(hover:primary-hover focus:primary-hover active:primary-active)
    border(hover:primary-hover focus:primary-hover active:primary-active)
  "

  let text = "
    border-none
    bg(initial hover:gray-100 focus:gray-100 active:gray-200)
    disabled:bg(initial hover:initial focus:initial active:initial)
  "

  let link = "
    border-none
    text(link hover:link-hover focus:link-hover active:link-active)
    bg(initial hover:initial focus:initial active:initial)
    disabled:bg(initial hover:initial focus:initial active:initial)
  "

  let dashed = `${def} border-dashed`

  let primary = "primary hover:primary-hover focus:primary-hover active:primary-active"
  let danger = "danger hover:danger-hover focus:danger-hover active:danger-active"

  let ghost = "bg(transparent hover:transparent focus:transparent active:transparent)"

  let make = (~size, ~_type, ~danger as isDanger, ~ghost as isGhost, ~block, ~disabled as _) => {
    open Js.Array2
    let classes = ref([init, disabled])

    let colors = switch (_type, isDanger) {
    | (#default, false) => [def]
    | (#default, true) => [`text(${danger})`, `border(${danger})`]
    | (#primary, false) => ["text-white", `bg(${primary})`, `border(${primary})`]
    | (#primary, true) => ["text-white", `bg(${danger})`, `border(${danger})`]
    | (#text, false) => [text]
    | (#text, true) => [text, `text(${danger})`]
    | (#link, false) => [link]
    | (#link, true) => [link, `text(${danger})`]
    | (#dashed, false) => [dashed, "border-dashed"]
    | (#dashed, true) => [dashed, `text(${danger})`, `border(${danger})`]
    }

    classes.contents = classes.contents->concat(colors)

    if block {
      classes.contents->push("w-full")->ignore
    }

    if (isGhost) {
      switch (_type, isDanger) {
      | (#primary, false) => classes.contents->push(`text(${primary})`)->ignore
      | (#primary, true) => classes.contents->push(`text(${danger})`)->ignore
      | (_, _) => classes.contents->push("text-white")->ignore
      }
      classes.contents->push(ghost)->ignore
    }

    switch size {
    | #default => classes.contents->push("h-8 py-[4px]")->ignore
    | #small => classes.contents->push("h-6 py-0")->ignore
    | #large => classes.contents->push("text-lg h-10 py-[7px]")->ignore
    }

    classes.contents->apply->tw
  }
}

type style = MxRC_React.style

@react.component @genType
let make = React.forwardRef((
  ~style: option<style>=?,
  ~_type: _type=#default,
  ~size,
  ~danger=false,
  ~block=false,
  ~disabled=false,
  ~ghost=false,
  ~children=?,
  (),
  ref,
) => {
  let context = React.useContext(MxRC__ConfigProvider.ConfigContext.ctx)

  open Belt.Option
  let size = size->getWithDefault(context.size)

  let className = Style.make(~size, ~_type, ~danger, ~ghost, ~block, ~disabled)
  let style = style->getWithDefault(ReactDOM.Style.make())
  let children = children->getWithDefault(React.null)

  <button className style disabled ref=?{Js.Nullable.toOption(ref)->Belt.Option.map(ReactDOM.Ref.domRef)}>
    children
  </button>
})
