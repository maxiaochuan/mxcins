open MxRC__Libs__Twind

let makeNoStyled = () => ["w-full p-0 m-0"]->atw

let makeStyled = (class, ~size, ~z, ~affix, ~focused) => {
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
    hover:(border-primary-hover)
    focus:(border-primary-hover shadow-input-focus)
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
    "border-primary-hover shadow-input-focus"->push
  }

  switch size {
  | #default => "h-8 px-3-bordered"
  | #small => "h-6 px-2-bordered"
  | #large => "h-10 px-3-bordered text-base"
  }->push

  if z {
    "z-1"->push
  }

  classes->atw(~class?)
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
        // "& > *": ["table-cell align-middle"]->apply,
      }->css,
    ]

    classes->atw
  }

  (out, inner)
}

let makeGroupAddon = (~isStandard) => {
  let classes = [
    "relative w-0 table-cell font-normal transition",
    isStandard ? "px-3-bordered text(sm center text) bg(background) border(1 border)" : "-left-px",
    {
      "&:first-child": ["border-r-0"]->apply,
      "&:last-child": ["border-l-0"]->apply,
    }->css,
  ]

  classes->atw
}
