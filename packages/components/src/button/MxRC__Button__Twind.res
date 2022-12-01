open MxRC__Twind
let init = "
    relative
    inline-block
    font-normal
    whitespace-nowrap
    text(sm center text)
    border(1 solid border)
    rounded
    px-4-bordered
    transition
  "

let disabled = "
    disabled:cursor-not-allowed
    disabled:text(text-disabled hover:text-disabled focus:text-disabled active:text-disabled)
    disabled:bg(background-disabled hover:background-disabled focus:background-disabled active:background-disabled)
    disabled:border(border hover:border focus:border active:border)
  "
/* --- with action colors --- */
let colors = {
  "primary": "primary hover:primary-hover focus:primary-hover active:primary-active",
  "danger": "danger hover:danger-hover focus:danger-hover active:danger-active",
  "link": "link hover:link-hover focus:link-hover active:link-active",
  "initial": "initial hover:initial focus:initial active:initial",
  "transparent": "transparent hover:transparent focus:transparent active:transparent",
}
/* --- with action colors --- */

let text = "
    border-transparent
    bg(initial hover:(black opacity-[0.018]) focus:(black opacity-[0.018]) active:(black opacity-[0.028]))
    disabled:bg(initial hover:initial focus:initial active:initial)
  "

let block = "w-full"

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

  /* --- colors, `type` `danger` --- */
  switch (_type, isDanger) {
  | (#default, false) =>
    `text(${colors["primary"]}) border(${colors["primary"]}) text-text border-border`
  | (#default, true) => `text(${colors["danger"]}) border(${colors["danger"]})`
  | (#primary, false) => `bg(${colors["primary"]}) border(${colors["primary"]}) text-white`
  | (#primary, true) => `bg(${colors["danger"]}) border(${colors["danger"]}) text-white `
  | (#dashed, false) =>
    `text(${colors["primary"]}) border(${colors["primary"]}) text-text border-border border-dashed`
  | (#dashed, true) =>
    `text(${colors["danger"]}) border(${colors["danger"]}) text-text border-border border-dashed`
  | (#text, false) => text
  | (#text, true) => text ++ `text(${colors["danger"]})`
  | (#link, false) =>
    `text(${colors["link"]}) bg(${colors["initial"]}) disabled:bg(${colors["initial"]}) border-transparent`
  | (#link, true) =>
    `text(${colors["danger"]}) bg(${colors["initial"]}) disabled:bg(${colors["initial"]}) border-transparent`
  | (_, _) => ""
  }->push
  /* --- colors, `type` `danger` --- */

  /* --- block --- */
  isBlock ? block->push : ()

  /* --- block --- */

  /* --- ghost --- */
  if isGhost {
    switch (_type, isDanger) {
    | (#primary, false) => `bg(${colors["transparent"]}) text(${colors["primary"]})`
    | (#primary, true) => `bg(${colors["transparent"]}) text(${colors["danger"]})`
    | (#link, _) => ""
    | (#text, _) => ""
    | (_, _) => "text-white border-white"
    }->push

    `disabled:bg(${colors["transparent"]})`->push
  }
  /* --- ghost --- */

  /* --- size --- */
  switch size {
  | #default => "h-8"
  | #small => "h-6"
  | #large => "h-10 text-base"
  }->push
  /* --- size --- */

  /* --- shape --- */
  switch (shape, size) {
  | (#circle, #default) => `rounded-full px-0 min-w-8 max-w-8`
  | (#circle, #small) => `rounded-full px-0 min-w-6 max-w-6`
  | (#circle, #large) => `rounded-full px-0 min-w-10 max-w-10`
  | (#round, _) => `rounded-full`
  | (_, _) => ""
  }->push
  /* --- shape --- */

  /* --- before --- */
  push(
    "before::(hidden absolute content-empty inset-[-1px] z-[1] bg-white opacity-30 transition transition-opacity)",
  )
  /* --- before --- */

  {">span": ["inline-block"]->apply}->css->push

  if isIconOnly {
    "px-0"->push
    switch size {
    | #default => "w-8 leading-8 text-base"
    | #small => "w-6 leading-6" ++ {".anticon": ["align-baseline"]->apply}->css
    | #large => "w-10 leading-10 text-lg"
    }->push
  }

  if isLoading {
    push("cursor-default before::block")
  }

  switch (classes->apply->tw, className) {
  | (classes, Some(className)) => [classes, className]->joinWith(" ")
  | (classes, _) => classes
  }
}
