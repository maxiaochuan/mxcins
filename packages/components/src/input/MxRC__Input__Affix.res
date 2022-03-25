module InputAffixAddon = {
  // open MxRC__Libs__React
  @react.component
  let make = (~children=?) => {
    let children = children->Belt.Option.getWithDefault(React.null)

    // let isStandard = children->Children.isString

    <span> children </span>
  }
}

@react.component @genType
let make = (~className=?, ~children=?) => {
  let children = children->Belt.Option.getWithDefault(React.null)
  <span ?className> children </span>
}
