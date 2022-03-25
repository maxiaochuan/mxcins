module InputGroup = MxRC__Input__Group
module InputAffix = MxRC__Input__Affix

type node = MxRC__Libs__React.node

type forwardRef = {
  focus: unit => unit,
  blur: unit => unit,
  input: option<Dom.htmlInputElement>,
}

@react.component @genType
let make = React.forwardRef((~size=?,
~className=?,
~style=?,
~placeholder=?,
~addonBefore: option<node>=?,
~addonAfter: option<node>=?,
~prefix: option<node>=?,
~suffix: option<node>=?,
//events
~onPressEnter: option<ReactEvent.Keyboard.t => unit>=?,
~onKeyDown: option<ReactEvent.Keyboard.t => unit>=?,
ref) => {
  let inputRef: React.ref<Js.Nullable.t<Dom.element>> = React.useRef(Js.Nullable.null)

  React.useImperativeHandle0(ref, () => {
    let input = inputRef.current->Js.Nullable.toOption
    {
      input: input
      ->Belt.Option.map(input => input->Webapi.Dom.HtmlInputElement.ofElement)
      ->Belt.Option.getUnsafe,
      focus: () =>
        input->Belt.Option.forEach(input =>
          input
          ->Webapi.Dom.HtmlElement.ofElement
          ->Belt.Option.forEach(input => input->Webapi.Dom.HtmlElement.focus)
        ),
      blur: () =>
        input->Belt.Option.forEach(input =>
          input
          ->Webapi.Dom.HtmlElement.ofElement
          ->Belt.Option.forEach(input => input->Webapi.Dom.HtmlElement.blur)
        ),
    }
  })
  // config context
  let context = React.useContext(MxRC__ConfigProvider.ConfigContext.ctx)

  // size
  let size = size->Belt.Option.getWithDefault(context.size)

  let inGroup = addonBefore->Belt.Option.isSome || addonAfter->Belt.Option.isSome
  let hasfix = prefix->Belt.Option.isSome || suffix->Belt.Option.isSome

  let onKeyDown = event => {
    // press enter
    if event->ReactEvent.Keyboard.key === "Enter" {
      onPressEnter->Belt.Option.forEach(fn => event->fn)
    }

    onKeyDown->Belt.Option.forEach(fn => event->fn)
  }

  let child = {
    if hasfix {
      let prefix = switch prefix {
      | Some(prefix) => <InputAffix.InputAffixAddon> prefix </InputAffix.InputAffixAddon>
      | _ => React.null
      }
      let suffix = switch suffix {
      | Some(suffix) => <InputAffix.InputAffixAddon> suffix </InputAffix.InputAffixAddon>
      | _ => React.null
      }

      let child =
        <input ref={inputRef->ReactDOM.Ref.domRef} type_="text" ?style ?placeholder onKeyDown />

      let className = className->MxRC__Input__Twind.makeInputBox(~size, ~z=inGroup, ~flex=true)
      <InputAffix className> prefix child suffix </InputAffix>
    } else {
      let className = className->MxRC__Input__Twind.makeInputBox(~size, ~z=inGroup, ~flex=false)
      <input
        ref={inputRef->ReactDOM.Ref.domRef} type_="text" className ?style ?placeholder onKeyDown
      />
    }
  }

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
