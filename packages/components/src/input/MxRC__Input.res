open MxRC__Antd
open MxRC__ConfigProvider.ConfigContext
module Twind = MxRC__Input__Twind

@genType.as("InputActionRef")
type actionRef = {
  focus: unit => unit,
  blur: unit => unit,
  input: option<Dom.htmlInputElement>,
}

@genType.as("InputType")
type _type = [#text | #password]

@genType.as("InputStatusType")
type status = [#default | #warning | #error]

@genType.import(("react", "ReactNode"))
type node = React.element

// TODO: ReactEvent ChangeEvent

exception AddonAfterConflict

@scope("Object") @val external cloneEvent: ('a, {..}) => 'b = "create"

@react.component @genType
let make = React.forwardRef((
  ~_type: _type=#text,
  ~size=?,
  ~className=?,
  ~groupStyle=?,
  ~placeholder=?,
  ~addonBefore: option<node>=?,
  ~addonBeforeNoStyle=false,
  ~addonAfter: option<node>=?,
  ~addonAfterNoStyle=false,
  ~prefix: option<node>=?,
  ~suffix: option<node>=?,
  ~onPressEnter=?,
  ~onKeyDown=?,
  ~onFocus=?,
  ~onBlur=?,
  ~value=?,
  ~onChange=?,
  ~defaultValue=?,
  ~allowClear=false,
  ~maxLength=?,
  ~status=#default,
  ~disabled=false,
  ~id=?,
  ~name=?,
  ~autoComplete="off",
  ~actionRef: option<Js.Nullable.t<React.ref<actionRef>>>=?,
  ~onMouseEnter: option<ReactEvent.Mouse.t => unit>=?,
  ~onMouseLeave: option<ReactEvent.Mouse.t => unit>=?,
  ref,
) => {
  let size = size->useSizeConfig

  // value state
  let (v, set) = React.useState(_ => defaultValue)
  let isControled = !(value->Belt.Option.isNone)
  let value = value->Belt.Option.getWithDefault(v)

  // focused
  let (focused, setFocused) = React.useState(_ => false)

  // inputDomRef
  let inputRef = React.useRef(Js.Nullable.null)

  let focus = () => {
    if !disabled {
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
    }
  }

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

  React.useImperativeHandle0(ref, () => inputRef.current)
  React.useImperativeHandle0(actionRef->Belt.Option.getUnsafe, () => {
    {
      input: inputRef.current
      ->Js.Nullable.toOption
      ->Belt.Option.map(input => input->Webapi.Dom.HtmlInputElement.ofElement)
      ->Belt.Option.getUnsafe,
      focus: focus,
      blur: blur,
    }
  })

  let onReset = event => {
    if !isControled {
      set(_ => None)
    }
    focus()

    onChange->Belt.Option.forEach(fn => {
      // onchange is some
      inputRef.current
      ->Js.Nullable.toOption
      ->Belt.Option.forEach(input => {
        // input is some
        let type_ = event->ReactEvent.Mouse.type_
        // on clear clicked
        if type_ === "click" {
          input
          ->Webapi.Dom.Element.cloneNodeDeep
          ->Webapi.Dom.HtmlInputElement.ofElement
          ->Belt.Option.forEach(clone => {
            // clone input element & set value empty
            clone->Webapi.Dom.HtmlInputElement.setValue("")
            let event = event->cloneEvent({
              "target": {"value": clone},
              "currentTarget": {"value": clone},
            })
            event->fn
          })
        }
      })
    })
  }

  // onchange
  let onChange = event => {
    open ReactEvent.Synthetic
    let target = event->target
    let next: option<string> = target["value"]
    let v = next->Belt.Option.getWithDefault("")

    let enabled = switch maxLength {
    | None => true
    | Some(maxLength) => maxLength + 1 > v->Js.String2.length
    }

    if enabled {
      if !isControled {
        set(_ => v->Some)
      }
      onChange->Belt.Option.forEach(fn => event->fn)
    }
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

  let hasfix = prefix->Belt.Option.isSome || suffix->Belt.Option.isSome || allowClear
  let hasaddon = addonBefore->Belt.Option.isSome || addonAfter->Belt.Option.isSome

  let child = {
    let className = hasfix
      ? Twind.makeNoStyle()
      : className->Twind.make(~size, ~affix=false, ~focused, ~z=hasaddon, ~status, ~disabled)

    let type_ = switch _type {
    | #text => "text"
    | #password => "password"
    }
    <input
      ref={inputRef->ReactDOM.Ref.domRef}
      type_
      className
      ?placeholder
      onBlur
      onFocus
      onKeyDown
      onChange
      disabled
      ?name
      ?id
      autoComplete
      ?onMouseEnter
      ?onMouseLeave
    />
  }

  let child = switch hasfix {
  | true => {
      let prefix = switch prefix {
      | Some(node) => {
          let className = Twind.makeFixed(~pos=#prefix, ~status)
          <span className> node </span>
        }
      | None => React.null
      }
      let suffix = switch (suffix, allowClear) {
      | (Some(_), true) => AddonAfterConflict->raise
      | (Some(node), false) => {
          let className = Twind.makeFixed(~pos=#suffix, ~status)
          <span className> node </span>
        }
      | (None, true) => {
          let className = Twind.makeFixed(~pos=#suffix, ~status)
          let icon = {
            let className = Twind.makeClear()
            let visibility = switch value {
            | Some(value) => value->Js.String2.length > 0 ? "visible" : "hidden"
            | _ => "hidden"
            }
            let style = ReactDOM.Style.make(~visibility, ())
            let onMouseDown = event => event->ReactEvent.Mouse.preventDefault
            let onClick = onReset
            <span className style role="button"> <CloseCircleFilled onMouseDown onClick /> </span>
          }
          <span className> icon </span>
        }
      | (None, false) => React.null
      }
      let className =
        className->Twind.make(~size, ~affix=true, ~z=hasaddon, ~focused, ~status, ~disabled)
      let onMouseUp = _ => focus()
      <span className onMouseUp> prefix child suffix </span>
    }
  | false => child
  }

  let child = switch hasaddon {
  | true => {
      let before = switch addonBefore {
      | Some(addon) => {
          let className = Twind.makeAddon(~noStyled=addonBeforeNoStyle)
          <span className> addon </span>
        }
      | _ => React.null
      }
      let after = switch addonAfter {
      | Some(addon) => {
          let className = Twind.makeAddon(~noStyled=addonAfterNoStyle)
          <span className> addon </span>
        }
      | _ => React.null
      }

      let (o, i) = Twind.makeGroup()

      <span className=o style=?groupStyle> <span className=i> before child after </span> </span>
    }
  | false => child
  }

  child
})