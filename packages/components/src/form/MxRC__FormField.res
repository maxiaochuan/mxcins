open MxRC__Utils
open MxRC__Form__Context
open MxRC__ConfigProvider.ConfigContext

module Row = MxRC__Grid__Row
module Col = MxRC__Grid__Col

module Twind = {
  open MxRC__Twind
  let make = (class, ~hasError) => {
    let classes = ["relative flex mb-6 transition"]

    if hasError {
      classes->Js.Array2.push("mb-0 transition-none")->ignore
    }

    classes->atw(~class?)
  }

  let makeLabelCol = () => {
    let classes = ["h-8 overflow-hidden space-nowrap text-right align-middle"]
    classes->atw
  }

  let makeLabel = (~required) => {
    let classes = [
      "relative h-full inline-flex items-center after::(relative content-colon ml-[2px] mr-2)",
    ]

    if required {
      classes->Js.Array2.push("before::(inline-block content-asterisk text-danger mr-1)")->ignore
    }

    classes->atw
  }

  let makeExplain = () => {
    let classes = ["h-auto min-h-6 pt-1 text-xs"]
    classes->atw
  }

  let makeError = () => {
    let classes = ["h-auto text-danger"]
    classes->atw
  }
}

type register = MxRC__ReactHookForm.register

@react.component @genType
let make = (
  ~name: string,
  ~className: option<string>=?,
  ~label: option<string>=?,
  ~hideLabel=false,
  ~placeholder: option<string>=?,
  ~required=false,
  ~register: option<register>=?,
  ~children: React.element,
) => {
  let id = React.useMemo0(() => nanoid())
  let methods = MxRC__ReactHookForm.useFormContext()
  let messages = useformErrorMessagesConfig()
  let (span1, span2) = FormContext.useColspanConfig()

  "asdf123"->Js.log2(register)
  "asdf"->Js.log2(register->Belt.Option.map(r => r.onChange))

  let registed = methods["register"](.
    name,
    {
      "required": register
      ->Belt.Option.map(r => r.required)
      ->Belt.Option.getUnsafe
      ->Belt.Option.getWithDefault(
        messages
        ->Js.Dict.get("required")
        ->Belt.Option.getWithDefault("")
        ->Js.String2.replace("{{label}}", label->Belt.Option.getWithDefault(name)),
      ),
      "max": register->Belt.Option.map(r => r.max),
      "min": register->Belt.Option.map(r => r.min),
      "maxLength": register->Belt.Option.map(r => r.maxLength),
      "minLength": register->Belt.Option.map(r => r.minLength),
      "onChange": register->Belt.Option.map(r => r.onChange->Belt.Option.getWithDefault(_ => ())),
    },
  )
  let error = methods["formState"]["errors"]->Js.Dict.get(name)

  let children = React.cloneElement(
    children,
    {
      "id": id,
      "name": name,
      "ref": registed["ref"],
      "placeholder": placeholder,
      "onChange": registed["onChange"],
      "onBlur": registed["onBlur"],
      "status": error->Belt.Option.isNone ? None : "errors"->Some,
    },
  )

  let hasError = error->Belt.Option.isSome
  let error = switch error {
  | Some(error) => {
      let message = error["message"]->React.string
      <div className={Twind.makeExplain()}>
        <div className={Twind.makeError()}> message </div>
      </div>
    }
  | _ => React.null
  }

  let hasLabel = label->Belt.Option.isSome && hideLabel === false
  let label = switch (label, hideLabel) {
  | (Some(label), false) =>
    <Col className={Twind.makeLabelCol()} span={span1}>
      <label className={Twind.makeLabel(~required)} htmlFor=id> {label->React.string} </label>
    </Col>
  | _ => React.null
  }

  let className = className->Twind.make(~hasError)
  let children = <Col span={hasLabel ? span2 : 24}> children error </Col>

  <Row className> label children </Row>
}
