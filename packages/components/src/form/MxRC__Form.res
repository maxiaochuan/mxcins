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

module FormContext = {
  type colspan = (int, int)
  type value = { colspan }

  let initColspan = (6, 18)
  let initContext = { colspan: initColspan }

  let makeContext = (~colspan: option<colspan>) => {
    {
      colspan: colspan->Belt.Option.getWithDefault(initColspan),
    }
  }

  let context = React.createContext(initContext)

  module Provider = {
    let provider = React.Context.provider(context)
    @react.component
    let make = (~value, ~children) => {
      React.createElement(provider, {"value": value, "children": children})
    }
  }
}


module Twind = {
  open MxRC__Twind
  let make = () => {
    ["relative w-full"]->atw
  }
}

// type onFinish<'v> = ReactHookForm.onVailid<'v>
type onFinish<'v> = Js.Dict.t<'v> => unit

@react.component @genType
let make = (
  ~form=?,
  ~initialValues: option<'init>=?,
  ~onFinish: option<onFinish<'v>>=?,
  ~onFinishFailed: option<onFinish<'v>>=?,
  ~children=?,
  ~colspan=?,
) => {
  let methods = ReactHookForm.useForm({
    "mode": "all",
    "defaultValues": initialValues,
  })

  let methods = form->Belt.Option.getWithDefault(methods)

  let onSubmit = event => {
    methods["handleSubmit"](. onFinish, onFinishFailed)(. event)
  }

  let onReset = event => {
    event->ReactEvent.Form.preventDefault
    let reset: unit => unit = methods["reset"]
    reset()
  }

  let children = children->Belt.Option.getWithDefault(React.null)
  let className = Twind.make()

  let children = React.createElementVariadic(
    ReactHookForm.FormProvider.make,
    Obj.magic(methods),
    [React.cloneElement(<form className onSubmit> children </form>, {"onReset": onReset})],
  )

  let value = React.useMemo1(() => FormContext.makeContext(~colspan=colspan), [colspan->Js.Json.stringifyAny])

  <FormContext.Provider value> children </FormContext.Provider>
}
