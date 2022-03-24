module InputGroupTwind = {
  open MxRC__Libs__Twind
  // open Js.Array2

  let makeOut = class => {
    ["inline-block"]->atw(~class?)
  }

  let makeIn = class => {
    let classes = [
      "table w-full m-0 p-0 tabular-nums",
      {
        "& > *:first-child": ["rounded-l"]->apply,
        "& > *:last-child": ["rounded-r"]->apply,
        "& > *:not(:first-child)": ["rounded-l-none"]->apply,
        "& > *:not(:last-child)": ["rounded-r-none"]->apply,
        "& > *": ["table-cell align-middle"]->apply,
      }->css,
    ]

    classes->atw(~class?)
  }

  let makeAddon = (~isStandard) => {
    "isStandard"->Js.log2(isStandard)
    let classes = [
      "relative font-normal transition",
      isStandard
        ? "px-3-bordered text(sm center text) bg(background) border(1 border)"
        : "-left-px",
      {
        "&:first-child": ["border-r-0"]->apply,
        "&:last-child": ["border-l-0"]->apply,
      }->css,
    ]
    "classes"->Js.log2(classes)

    classes->atw
  }
}

module InputGroupAddon = {
  open MxRC__Libs__React
  @react.component
  let make = (~children=?) => {
    let children = children->Belt.Option.getWithDefault(React.null)

    let isStandard = children->Children.isString

    <span className={InputGroupTwind.makeAddon(~isStandard)}> children </span>
  }
}

@react.component @genType
let make = (~className=?, ~innerClassName=?, ~children=?) => {
  let children = children->Belt.Option.getWithDefault(React.null)
  <span className={InputGroupTwind.makeOut(className)}>
    <span className={InputGroupTwind.makeIn(innerClassName)}> children </span>
  </span>
}
