module FormContext = {
  type colspan = (int, int)
  type value = {colspan: colspan}

  let initColspan = (6, 18)
  let initContext = {colspan: initColspan}

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
  let make = class => {
    ["relative w-full"]->atw(~class?)
  }
}

// type onFinish<'v> = ReactHookForm.onVailid<'v>
type onFinish<'v> = Js.Dict.t<'v> => unit

@react.component @genType
let make = (
  ~className=?,
  ~style=?,
  ~form=?,
  ~initialValues: option<'init>=?,
  ~onFinish: option<onFinish<'v>>=?,
  ~onFinishFailed: option<onFinish<'v>>=?,
  ~children=?,
  ~colspan=?,
) => {
  let methods = MxRC__ReactHookForm.useForm({
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
  let className = className->Twind.make

  let children = React.createElementVariadic(
    MxRC__ReactHookForm.FormProvider.make,
    Obj.magic(methods),
    [React.cloneElement(<form className ?style onSubmit> children </form>, {"onReset": onReset})],
  )

  let value = React.useMemo1(
    () => FormContext.makeContext(~colspan),
    [colspan->Js.Json.stringifyAny],
  )

  <FormContext.Provider value> children </FormContext.Provider>
}
