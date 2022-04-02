module Children = {
  let isString: React.element => bool = %raw("function(c) { return typeof c === 'string' }")

  let isNumber: React.element => bool = %raw("function(c) { return typeof c === 'number' }")

  external asString: React.element => string = "%identity"
}

@module("./_externals.js") @val external combineRef: (React.element, 'ref) => 'ref = "combineRef"

module Partal = {
  @react.component @genType
  let make = (~getContainer: unit => Dom.element, ~children=?) => {
    let children = children->Belt.Option.getWithDefault(React.null)
    let containerRef = React.useRef(None)
    let initRef = React.useRef(false)
    if !initRef.current {
      initRef.current = true
      containerRef.current = getContainer()->Some
    }

    "partal render"->Js.log3(containerRef.current, children)

    containerRef.current->Belt.Option.isSome
      ? ReactDOM.createPortal(children, containerRef.current->Belt.Option.getUnsafe)
      : React.null
  }
}
