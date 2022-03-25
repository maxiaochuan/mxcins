open MxRC__Libs__Twind

let makeInputBox = (class, ~size, ~z, ~flex) => {
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

  if flex {
    "inline-flex"->push
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
  | #prefix => "ml-1"
  | #suffix => "mr-1"
  }->push

  classes->atw
}
