type direction = [#vertical | #horizontal]
type align = [#center | #start | #end | #baseline]
type size = MxRC__ConfigProvider.ConfigContext.size

module SpaceTwind = {
  open MxRC__Libs__Twind
  open Js.Array2

  let init = "inline-flex"

  let make = (className, ~size, ~direction, ~align, ~wrap) => {
    let classes = [init]
    let push = str => classes->push(str)->ignore

    switch direction {
    | #horizontal => "flex-row"
    | #vertical => "flex-col"
    }->push

    switch align {
    | #center => "items-center"
    | #start => "items-start"
    | #end => "items-end"
    | #baseline => "items-baseline"
    }->push

    switch size {
    | #default => "gap-2"
    | #small => "gap-1"
    | #large => "gap-4"
    }->push

    if wrap {
      switch direction {
      | #horizontal => "flex-wrap"
      | _ => ""
      }->push
    }

    switch (classes->apply->tw, className) {
    | (classes, Some(className)) => [classes, className]->joinWith(" ")
    | (classes, _) => classes
    }
  }
}

type style = MxRC__Libs__React.style

@react.component @genType
let make = (
  ~className=?,
  ~style: option<style>=?,
  ~direction=#horizontal,
  ~align=#center,
  ~wrap=false,
  ~size=#default,
  ~split=?,
  ~children=React.null,
) => {
  let children = children->React.Children.toArray
  let max = children->Js.Array2.length - 1

  let className = SpaceTwind.make(className, ~size, ~direction, ~align, ~wrap)
  let children = children->Js.Array2.mapi((child, i) => {
    let isLast = i === max
    let key = "space-" ++ i->Js.Int.toString
    let child = <div key> child </div>
    switch (isLast, split) {
    | (false, Some(split)) => {
        let key = "space-split-" ++ i->Js.Int.toString
        [child, <div key> split </div>]->React.array
      }
    | (_, _) => child
    }
  })

  <div className ?style> {children->React.array} </div>
}
