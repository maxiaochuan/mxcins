open MxRC__Libs__Twind
let init = "
    relative
    font-normal
    text(sm center text)
    whitespace-nowrap
    border(1 gray-300)
    rounded-sm
    px-3
    transition
  "

let disabled = "
    disabled:cursor-not-allowed
    disabled:text(gray-400 hover:gray-400 focus:gray-400 active:gray-400)
    disabled:bg(gray-100 hover:gray-100 focus:gray-100 active:gray-100)
    disabled:border(gray-300 hover:gray-300 focus:gray-300 active:gray-300)
  "

let primary = "primary hover:primary-hover focus:primary-hover active:primary-active"
let danger = "danger hover:danger-hover focus:danger-hover active:danger-active"
let link = "link hover:link-hover focus:link-hover active:link-active"
let initial = "initial hover:initial focus:initial active:initial"
let transparent = "transparent hover:transparent focus:transparent active:transparent"

let def = `text(${primary}) text-text border(${primary}) border-gray-300`

let text = "
    border-none
    bg(initial hover:(black opacity-[0.018]) focus:(black opacity-[0.018]) active:(black opacity-[0.028]))
    disabled:bg(initial hover:initial focus:initial active:initial)
  "

let block = "w-full"

let circle = "rounded-full px-0"

let make = (
  className: option<string>,
  ~size,
  ~_type,
  ~shape,
  ~danger as isDanger,
  ~ghost as isGhost,
  ~block as isBlock,
  ~disabled as _,
  ~loading as isLoading,
  ~iconOnly as isIconOnly,
) => {
  open Js.Array2
  let classes = [init, disabled]
  let push = str => classes->push(str)->ignore
  let pushMany = strs => classes->pushMany(strs)->ignore

  /* --- colors, `type` `danger` --- */
  switch (_type, isDanger) {
  | (#default, false) => [def]
  | (#default, true) => [`text(${danger})`, `border(${danger})`]
  | (#primary, false) => ["text-white", `bg(${primary})`, `border(${primary})`]
  | (#primary, true) => ["text-white", `bg(${danger})`, `border(${danger})`]
  | (#text, false) => [text]
  | (#text, true) => [text, `text(${danger})`]
  | (#link, false) => [`text(${link})`, `bg(${initial})`, `disabled:bg(${initial})`, "border-none"]
  | (#link, true) => [`text(${danger})`, `bg(${initial})`, `disabled:bg(${initial})`, "border-none"]
  | (#dashed, false) => [def, "border-dashed"]
  | (#dashed, true) => [def, "border-dashed", `text(${danger})`, `border(${danger})`]
  }->pushMany
  /* --- colors --- */

  /* --- block --- */
  isBlock ? block->push : ()
  /* --- block --- */

  /* --- ghost --- */
  if isGhost {
    switch (_type, isDanger) {
    | (#primary, false) => `bg(${transparent}) text(${primary})`
    | (#primary, true) => `bg(${transparent}) text(${danger})`
    | (#link, _) => ""
    | (#text, _) => ""
    | (_, _) => "text-white border-white"
    }->push
    `disabled:bg(${transparent})`->push
  }
  /* --- ghost --- */

  /* --- size --- */
  switch size {
  | #default => "h-8"
  | #small => "h-6"
  | #large => "text-base h-10"
  }->push
  /* --- size --- */

  /* --- shape --- */
  switch (shape, size) {
  | (#circle, #default) => pushMany([circle, "min-w-8 max-w-8"])
  | (#circle, #small) => pushMany([circle, "min-w-6 max-w-6"])
  | (#circle, #large) => pushMany([circle, "min-w-10 max-w-10"])
  | (#round, #default) => pushMany(["rounded-full"])
  | (#round, #small) => pushMany(["rounded-full"])
  | (#round, #large) => pushMany(["rounded-full"])
  | _ => ()
  }
  /* --- shape --- */

  // before
  push(
    "before::(hidden absolute content-empty inset-[-1px] z-[1] bg-white opacity-30 transition transition-opacity)",
  )

  { ">span": ["inline-block"]->apply }->css->push

  if isIconOnly {
    "px-0"->push
    switch size {
    | #default => ["w-8 leading-8 text-base"]
    | #small => ["w-6 leading-6", {".anticon": ["align-baseline"]->apply }->css]
    | #large => ["w-10 leading-10 text-lg"]
    }->pushMany
  }

  if isLoading {
    push("cursor-default before::block")
  }

  switch (classes->apply->tw, className) {
  | (classes, Some(className)) => [classes, className]->joinWith(" ")
  | (classes, _) => classes
  }
}
