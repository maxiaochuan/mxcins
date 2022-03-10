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
  open MxLibs.Dom.Element
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
  let make = React.forwardRef((~iconOnly, ~style=?, ~children, ref) => {
    open MxRC__Libs__Twind
    let className =
      switch iconOnly {
      | true => ["transition transition-[width, opacity]", {".anticon": ["pr-0 animation-none"]}->css]
      | false => ["transition transition-[width, opacity]", {".anticon": ["pr-1 animation-none"]}->css]
      }
      ->apply
      ->tw

    let style = style->Belt.Option.getWithDefault(ReactDOM.Style.make())

    <span ref=?{ref->Js.Nullable.toOption->Belt.Option.map(ReactDOM.Ref.domRef)} className style>
      children
    </span>
  })
}

@react.component
let make = (~loading, ~exist, ~iconOnly) => {
  switch exist {
  | true => <TransitionBody iconOnly> <LoadingOutlined /> </TransitionBody>
  | false => {
      let children = (params: RcMotion.params, ref) => {
        <TransitionBody ref style={params.style} iconOnly> <LoadingOutlined /> </TransitionBody>
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
