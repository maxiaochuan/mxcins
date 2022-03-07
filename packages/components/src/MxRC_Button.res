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

  let primary = "
    text-white
    bg(primary hover:primary-hover focus:primary-hover active:primary-active)
    border(primary hover:primary-hover focus:primary-hover active:primary-active)
  "

  let text = "
    border-none
    bg(initial hover:gray-100 focus:gray-100 active:gray-200)
    disabled:bg(initial hover:initial focus:initial active:initial)
  "

  let dashed = `${def} border-dashed`

  let danger = "danger hover:danger-hover focus:danger-hover active:danger-active"

  let make = (~size, ~_type, ~danger as d, ~block, ~disabled as dis) => {
    open Js.Array2
    let classes = ref([init])
    if dis {
      classes.contents->push(disabled)->ignore
    }
    let colors = switch (_type, d) {
    | (#default, false) => [def]
    | (#default, true) => [`text(${danger})`, `border(${danger})`]
    | (#primary, false) => [primary]
    | (#primary, true) => [primary, `bg(${danger})`, `border(${danger})`]
    | (#text, false) => [text]
    | (#text, true) => [text, `text(${danger})`]
    | (#dashed, false) => [dashed, "border-dashed"]
    | (#dashed, true) => [dashed, `text(${danger})`, `border(${danger})`]
    }

    classes.contents = classes.contents->concat(colors)

    if block {
      classes.contents->push("w-full")->ignore
    }

    switch size {
    | #default => classes.contents->push("h-8")->ignore
    | #small => classes.contents->push("h-6")->ignore
    | #large => classes.contents->push("h-10")->ignore
    }

    classes.contents->apply->tw
  }
}

@react.component
let make = React.forwardRef((
  ~style,
  ~_type: _type=#default,
  ~size,
  ~danger=false,
  ~block=false,
  ~disabled=false,
  ~children,
  ref_,
) => {
  let context = React.useContext(MxRC__ConfigProvider.ConfigContext.ctx)

  let size = size->Belt.Option.getWithDefault(context.size)

  let className = Style.make(~size, ~_type, ~danger, ~block, ~disabled)

  <button className style ref=?{Js.Nullable.toOption(ref_)->Belt.Option.map(ReactDOM.Ref.domRef)}>
    children
  </button>
})
