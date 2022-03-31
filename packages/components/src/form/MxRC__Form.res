module ReactHookForm = {
  // type registed<'a> = {
  //   // ref: (a: 'a) => unit,
  //   ref: Js.Nullable.t<React.ref<'a>>,
  //   onChange: ReactEvent.Form.t => unit,
  //   onBlur: ReactEvent.Focus.t => unit,
  // }

  // type opt = {"required": option<bool>}

  // type register<'ref> = (. string, opt) => registed<'ref>

  // type error = {message: string, ref: React.ref<Dom.element>, _type: string}
  // type formState = {errors: Js.Dict.t<error>}

  // type onVailid<'v> = (Js.Dict.t<'v>) => unit
  // type onInvalid<'v> = (Js.Dict.t<'v>) => unit
  // type handleSubmitReturned = ReactEvent.Form.t => unit
  // type handleSubmit<'v> = (. option<onVailid<'v>>, option<onInvalid<'v>>) => handleSubmitReturned
  // type reset = () => unit

  // type useFormReturned<'ref, 'v> = {register: register<'ref>, formState: formState, handleSubmit: handleSubmit<'v>, reset: reset }

  // @module("react-hook-form") external useForm: 'useFormOptions => useFormReturned<'ref, 'v> = "useForm"
  @module("react-hook-form") external useForm: {..} => {..} = "useForm"

  @module("react-hook-form")
  external useFormContext: unit => {..} = "useFormContext"

  module FormProvider = {
    @module("react-hook-form") @react.component
    external make: (~children: React.element) => React.element = "FormProvider"
  }
}

module Twind = {
  open MxRC__Twind
  let make = () => {
    ["relative w-full"]->atw
  }
}

// type onFinish<'v> = ReactHookForm.onVailid<'v>
  type onFinish<'v> = (Js.Dict.t<'v>) => unit

@react.component @genType
let make = (
  ~initialValues: option<'init> =?,
  ~onFinish: option<onFinish<'v>>=?,
  ~onFinishFailed: option<onFinish<'v>>=?,
  ~children=?,
) => {
  let methods = ReactHookForm.useForm({
    "mode": "all",
    "defaultValues": initialValues,
  })

  let onSubmit = event => {
    methods["handleSubmit"](. onFinish, onFinishFailed)(. event)
  }

  let onReset = event => {
    event->ReactEvent.Form.preventDefault
    let reset: () => unit = methods["reset"]
    reset()
  }

  let children = children->Belt.Option.getWithDefault(React.null)
  let className = Twind.make()

  React.createElementVariadic(
    ReactHookForm.FormProvider.make,
    Obj.magic(methods),
    [
      React.cloneElement(
        <form className onSubmit>
          children
        </form>,
        { "onReset": onReset },
      )
    ],
  )
}
