type _type = [#horizontal | #vertical]

type orientation = [#left | #right | #center]

module DividerTwind = {
  open MxRC__Libs__Twind
  open Js.Array2
  let init = "flex p-0 text-sm"
  let horizontal = "flex w-full min-w-full my-6 border-gray-300 border-t"

  let make = (className, ~_type, ~orientation, ~hasText, ~dashed as isDashed) => {
    let classes = [init]
    let pushMany = strs => classes->pushMany(strs)->ignore

    switch _type {
    | #vertical => ["relative inline-block mx-2 top-[-0.06em] h-[0.9em] align-middle border-l"]
    | #horizontal =>
      switch (hasText, orientation) {
      | (true, orientation) => {
          let (lw, rw) = switch orientation {
          | #left => ("5%", "95%")
          | #right => ("95%", "5%")
          | #center => ("50%", "50%")
          }

          let pseudo = w => `relative top-1/2 content-empty border-t w-[${w}]`
          let before = `before::(${lw->pseudo})`
          let after = `after::(${rw->pseudo})`
          [
            horizontal,
            "border-t-0 font-medium text-base whitespace-nowrap text-center",
            css({"span": ["inline-block px-[1em]"]->apply}),
            before,
            after,
          ]
        }
      | (false, _) => [horizontal]
      }
    }->pushMany

    if isDashed {
      ["border-dashed"]->pushMany
    }

    switch (classes->apply->tw, className) {
    | (classes, Some(className)) => [classes, className]->joinWith(" ")
    | (classes, _) => classes
    }
  }
}

@react.component @genType
let make = (
  ~className,
  ~_type=#horizontal,
  ~dashed=false,
  ~orientation=#center,
  ~children: option<React.element>=?,
) => {
  let hasText = switch children {
  | Some(_) => true
  | _ => false
  }

  let className = className->DividerTwind.make(~_type, ~dashed, ~orientation, ~hasText)

  let children = switch children {
  | None => React.null
  | Some(children) => <span> children </span>
  }

  <div className> children </div>
}
