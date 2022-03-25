open MxRC__Libs__Twind

let makeNoStyle = () => ["w-full p-0 m-0"]->atw

let make = (class, ~size, ~z, ~affix, ~focused, ~status) => {
  let classes = [
    "
    inline-block
    relative
    m-0
    min-w-0
    w-full
    overflow-visible
    text(sm text)
    border(1 solid border)
    transition
    tabular-nums
    rounded
  ",
  ]
  let push = str => classes->Js.Array2.push(str)->ignore

    // focus:(border-primary-hover shadow-input-focus)

  if affix {
    "inline-flex"->push
  }

  if focused {
    switch status {
    | #default => "border-primary-hover shadow-input-focus"
    | #warning => "border-warning shadow-input-focus"
    | #error => "border-error shadow-input-focus"
    }->push
  }

  switch size {
  | #default => "h-8 px-3-bordered"
  | #small => "h-6 px-2-bordered"
  | #large => "h-10 px-3-bordered text-base"
  }->push

  switch status {
  | #default => "hover:(border-primary-hover)"
  | #warning => "border-warning hover:(border-warning-hover) shadow-warning-outline"
  | #error => "border-error hover:(border-error-hover) shadow-error-outline"
  }->push

  if z {
    "z-1"->push
  }

  classes->atw(~class?)
}

let makeTextArea = (class, ~size, ~focused) => {
  let class = make(class, ~size, ~affix=false, ~z=false, ~focused, ~status=#default)
  let classes = ["h-auto"]
  let push = str => classes->Js.Array2.push(str)->ignore

  switch size {
  | #default => "py-y8-bordered"
  | #small => "py-y6-bordered"
  | #large => "py-y10-bordered"
  }->push

  classes->atw(~class)
}

let makeFixed = (~pos) => {
  let classes = ["flex flex-none items-center"]
  let push = str => classes->Js.Array2.push(str)->ignore

  switch pos {
  | #prefix => "mr-1"
  | #suffix => "ml-1"
  }->push

  classes->atw
}

let makeGroup = () => {
  let out = {
    ["inline-block w-full"]->atw
  }

  let inner = {
    let classes = [
      "table w-full m-0 p-0 tabular-nums",
      {
        "& > *:first-child": ["rounded-l"]->apply,
        "& > *:last-child": ["rounded-r"]->apply,
        "& > *:not(:first-child)": ["rounded-l-none"]->apply,
        "& > *:not(:last-child)": ["rounded-r-none"]->apply,
        "& > *": ["align-middle"]->apply,
      }->css,
    ]

    classes->atw
  }

  (out, inner)
}

let makeAddon = (~noStyled) => {
  let classes = [
    "relative w-0 table-cell font-normal transition",
    noStyled ? "-left-px" : "px-3-bordered text(sm center text) bg(background) border(1 border)",
    {
      "&:first-child": ["border-r-0"]->apply,
      "&:last-child": ["border-l-0"]->apply,
    }->css,
  ]

  classes->atw
}

let makeClear = () =>
  [
    "
    text-text-disabled
    pointer
    text-xs
    hover:(text-text-secondary)
    active:(text-text)
    transition
    ",
    {"vertical-align": "-1px"}->css,
  ]->atw
