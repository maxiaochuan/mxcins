// type registed<'a> = {
//   // ref: (a: 'a) => unit,
//   ref: Js.Nullable.t<React.ref<'a>>,
//   onChange: ReactEvent.Form.t => unit,
//   onBlur: ReactEvent.Focus.t => unit,
// }

type vnum = {value: int, message: string}
type onChange = ReactEvent.Form.t => unit
@genType
type register = {
  required: option<string>,
  max: option<vnum>,
  min: option<vnum>,
  maxLength: option<vnum>,
  minLength: option<vnum>,
  onChange: option<onChange>,
}

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
