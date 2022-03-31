module ReactHookForm = {
  type registed<'a> = {
    // ref: (a: 'a) => unit,
    ref: Js.Nullable.t<React.ref<'a>>,
    onChange: ReactEvent.Form.t => unit,
    onBlur: ReactEvent.Focus.t => unit,
  }

  type opt = {"required": option<bool>}

  type register<'a> = (. string, opt) => registed<'a>

  type error = {message: string, ref: React.ref<Dom.element>, _type: string}
  type formState = {errors: Js.Dict.t<error>}

  type useFormReturned<'a> = {register: register<'a>, formState: formState}

  @module("react-hook-form") external useForm: {..} => useFormReturned<'a> = "useForm"

  @module("react-hook-form") external useTopForm: {..} => 'a = "useForm"

  @module("react-hook-form")
  external useFormContext: unit => useFormReturned<'a> = "useFormContext"

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

type onFinish<'a> = ({..} as 'a) => unit

@react.component @genType
let make = (
  ~onFinish: option<onFinish<'a>>=?,
  ~onFinishFailed: option<onFinish<'a>>=?,
  ~children=?,
) => {
  let methods = ReactHookForm.useTopForm({"mode": "all"})

  let children = children->Belt.Option.getWithDefault(React.null)
  let className = Twind.make()

  React.createElementVariadic(
    ReactHookForm.FormProvider.make,
    methods,
    [
      <form className onSubmit={methods["handleSubmit"](onFinish, onFinishFailed)}>
        children
      </form>,
    ],
  )
}
