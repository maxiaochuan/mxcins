@genType.import(("react", "CSSProperties"))
type style = ReactDOM.style

@genType.import(("react", "ReactNode"))
type node = React.element

module Children = {
  let isString: React.element => bool = %raw("function(c) { return typeof c === 'string' }")

  let isNumber: React.element => bool = %raw("function(c) { return typeof c === 'number' }")

  external asString: React.element => string = "%identity"
}
