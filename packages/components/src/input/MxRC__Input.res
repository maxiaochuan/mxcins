type node = MxRC__Libs__React.node

@genType
type forward = {
  focus: unit => unit,
  blur: unit => unit,
  input: option<Dom.htmlInputElement>,
}

type inputRef = React.ref<forward>

@react.component @genType
let make = React.forwardRef((~size=?,
~className=?,
// ~style=?,
~placeholder=?,
~addonBefore: option<node>=?,
~addonAfter: option<node>=?,
~prefix: option<node>=?,
~suffix: option<node>=?,
//events
~onPressEnter=?,
~onKeyDown=?,
~onFocus=?,
~onBlur=?,
~onChange=?,
//value
~value=?,
~defaultValue=?,
ref) => {
  let (v, set) = React.useState(_ => defaultValue)
  let isControled = !(value->Belt.Option.isNone)
  let value = value->Belt.Option.getWithDefault(v)
  // config context
  let context = React.useContext(MxRC__ConfigProvider.ConfigContext.ctx)

  let (focused, setFocused) = React.useState(_ => false)
  // size
  let size = size->Belt.Option.getWithDefault(context.size)

  let inputRef = React.useRef(Js.Nullable.null)

  let focus = () =>
    inputRef.current
    ->Js.Nullable.toOption
    ->Belt.Option.forEach(input =>
      input
      ->Webapi.Dom.HtmlElement.ofElement
      ->Belt.Option.forEach(input => {
        setFocused(_ => true)
        input->Webapi.Dom.HtmlElement.focus
      })
    )

  let blur = () =>
    inputRef.current
    ->Js.Nullable.toOption
    ->Belt.Option.forEach(input =>
      input
      ->Webapi.Dom.HtmlElement.ofElement
      ->Belt.Option.forEach(input => {
        setFocused(_ => false)
        input->Webapi.Dom.HtmlElement.blur
      })
    )

  React.useImperativeHandle0(ref, () => {
    {
      input: inputRef.current
      ->Js.Nullable.toOption
      ->Belt.Option.map(input => input->Webapi.Dom.HtmlInputElement.ofElement)
      ->Belt.Option.getUnsafe,
      focus: focus,
      blur: blur,
    }
  })

  let onChange = event => {
    open ReactEvent.Synthetic
    if (!isControled) {
      let next = event->target
      set(_ => next["value"])
    }
    onChange->Belt.Option.forEach(fn => event -> fn)
  }

  let onKeyDown = event => {
    // press enter
    if event->ReactEvent.Keyboard.key === "Enter" {
      onPressEnter->Belt.Option.forEach(fn => event->fn)
    }
    onKeyDown->Belt.Option.forEach(fn => event->fn)
  }

  let onFocus = event => {
    setFocused(_ => true)
    onFocus->Belt.Option.forEach(fn => event->fn)
  }

  let onBlur = event => {
    setFocused(_ => false)
    onBlur->Belt.Option.forEach(fn => event->fn)
  }

  let hasfix = prefix->Belt.Option.isSome || suffix->Belt.Option.isSome
  let hasaddon = addonBefore->Belt.Option.isSome || addonAfter->Belt.Option.isSome

  let child = {
    let className = hasfix
        ? MxRC__Input__Twind.makeNoStyled()
        : className->MxRC__Input__Twind.makeStyled(~size, ~affix=false, ~focused, ~z=hasaddon)
    <input
      ref={inputRef->ReactDOM.Ref.domRef}
      type_="text"
      className
      ?placeholder
      onBlur
      onFocus
      onKeyDown
      ?value
      onChange
    />
  }

  let child = switch hasfix {
  | true => {
      let prefix = switch prefix {
      | Some(node) => {
          let className = MxRC__Input__Twind.makeFixed(~pos=#prefix)
          <span className> node </span>
        }
      | _ => React.null
      }
      let suffix = switch suffix {
      | Some(node) => {
          let className = MxRC__Input__Twind.makeFixed(~pos=#suffix)
          <span className> node </span>
        }
      | _ => React.null
      }
      let className =
        className->MxRC__Input__Twind.makeStyled(~size, ~affix=true, ~z=hasaddon, ~focused)
      let onMouseUp = _ => focus()
      <span className onMouseUp> prefix child suffix </span>
    }
  | false => child
  }

  let child = switch hasaddon {
  | true => {
      let before = switch addonBefore {
      | Some(addon) => {
          // let isStandard = addon->MxRC__Libs__React.Children.isString
          let isStandard = true
          let className = MxRC__Input__Twind.makeGroupAddon(~isStandard)
          <span className> addon </span>
        }
      | _ => React.null
      }
      let after = switch addonAfter {
      | Some(addon) => {
          // let isStandard = addon->MxRC__Libs__React.Children.isString
          let isStandard = true
          let className = MxRC__Input__Twind.makeGroupAddon(~isStandard)
          <span className> addon </span>
        }
      | _ => React.null
      }

      let (o, i) = MxRC__Input__Twind.makeGroup()

      <span className=o> <span className=i> before child after </span> </span>
    }
  | false => child
  }

  child
})
