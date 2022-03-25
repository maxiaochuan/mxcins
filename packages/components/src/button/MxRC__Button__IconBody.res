open MxRC__Libs__Antd

module RcMotion = {
  type appear = Dom.element => ReactDOM.style

  type params = {style: ReactDOM.style}
  type children = (params, React.ref<Js.nullable<ReactDOM.domRef>>) => React.element

  @module("rc-motion") @react.component
  external make: (
    ~visible: bool,
    ~motionName: string,
    ~removeOnLeave: bool,
    ~onAppearStart: appear=?,
    ~onAppearActive: appear=?,
    ~onEnterStart: appear=?,
    ~onEnterActive: appear=?,
    ~onLeaveStart: appear=?,
    ~onLeaveActive: appear=?,
    ~children: children=?,
  ) => React.element = "default"
}

let getCollapsedWidth = _ =>
  ReactDOM.Style.make(~width="0px", ~opacity="0", ~transform="scale(0)", ())

let getRealWidth = node => {
  open Webapi.Dom.Element
  open Belt.Int
  ReactDOM.Style.make(
    ~width=node->scrollWidth->toString ++ "px",
    ~opacity="1",
    ~transform="scale(1)",
    (),
  )
}

module TransitionBody = {
  @react.component
  let make = React.forwardRef((~style=?, ~children, ref) => {
    open MxRC__Libs__Twind
    let className =
      [
        "transition transition-[width, opacity]",
        {
          ".anticon": ["pr-2 animate-none"]->apply,
          ".anticon svg": {"animation": "loadingCircle 1s infinite linear"},
        }->css,
      ]
      ->apply
      ->tw

    <span ref=?{ref->Js.Nullable.toOption->Belt.Option.map(ReactDOM.Ref.domRef)} className ?style>
      children
    </span>
  })
}

module MarginRightBody = {
  open MxRC__Libs__Twind
  @react.component
  let make = (~children) => {
    let className = ["pr-2"]->apply->tw
    <span className> children </span>
  }
}

@react.component
let make = (~loading, ~icon: option<React.element>, ~iconOnly) => {
  switch (iconOnly, icon, loading) {
  | (true, Some(icon), loading) => loading ? <LoadingOutlined /> : icon
  | (true, None, _) => React.null // unable
  | (false, Some(icon), loading) => {
      let child = loading ? <LoadingOutlined /> : icon
      <MarginRightBody> child </MarginRightBody>
    }
  | (false, None, loading) => {
      let children = (params: RcMotion.params, ref) => {
        <TransitionBody ref style={params.style}> <LoadingOutlined /> </TransitionBody>
      }

      <RcMotion
        visible={loading}
        motionName="motion"
        removeOnLeave=true
        onAppearStart={getCollapsedWidth}
        onAppearActive={getRealWidth}
        onEnterStart={getCollapsedWidth}
        onEnterActive={getRealWidth}
        onLeaveStart={getRealWidth}
        onLeaveActive={getCollapsedWidth}>
        children
      </RcMotion>
    }
  }
}
