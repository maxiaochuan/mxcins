open MxRC__Twind

let makeNoStyle = () => ["w-full p-0 m-0 disabled:cursor-not-allowed"]->atw

let make = (class, ~size, ~z, ~affix, ~focused, ~status, ~disabled) => {
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

  if affix {
    "inline-flex"->push
  }

  if focused {
    switch status {
    | #default => "border-primary-hover shadow-input-focus"
    | #warning => "border-warning shadow-input-focus-warning"
    | #error => "border-error shadow-input-focus-error"
    }->push
  }

  switch status {
  | #default => "hover:(border-primary-hover)"
  | #warning => "border-warning hover:(border-warning-hover)"
  | #error => "border-error hover:(border-error-hover)"
  }->push

  switch size {
  | #default => "h-8 px-3-bordered"
  | #small => "h-6 px-2-bordered"
  | #large => "h-10 px-3-bordered text-base"
  }->push

  if z {
    "z-1"->push
  }

  if disabled {
    "
      cursor-not-allowed
      text(text-disabled hover:text-disabled focus:text-disabled active:text-disabled)
      bg(background-disabled hover:background-disabled focus:background-disabled active:background-disabled)
      border(border hover:border focus:border active:border)
    "->push
  }

  classes->atw(~class?)
}

let makeTextArea = (class, ~size, ~focused, ~disabled) => {
  let class = make(class, ~size, ~affix=false, ~z=false, ~focused, ~status=#default, ~disabled)
  let classes = ["h-auto"]
  let push = str => classes->Js.Array2.push(str)->ignore

  switch size {
  | #default => "py-y8-bordered"
  | #small => "py-y6-bordered"
  | #large => "py-y10-bordered"
  }->push

  classes->atw(~class)
}

let makeFixed = (~pos, ~status) => {
  let classes = ["flex flex-none items-center"]
  let push = str => classes->Js.Array2.push(str)->ignore

  switch pos {
  | #prefix => "mr-1"
  | #suffix => "ml-1"
  }->push

  switch status {
  | #warning => "text-warning"
  | #error => "text-error"
  | _ => ""
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
    cursor-pointer
    text-xs
    hover:(text-text-secondary)
    active:(text-text)
    transition
    ",
    {"vertical-align": "-1px"}->css,
  ]->atw
