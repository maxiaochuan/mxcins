open MxRC__Utils
open MxRC__Form.ReactHookForm

module Twind = {
  open MxRC__Twind
  let make = class => {
    let classes = ["relative flex mb-6"]

    classes->atw(~class?)
  }

  let makeLabel = (~required) => {
    let classes = [
      "relative inline-flex items-center ml-[2px] after::(relative content-colon ml-[2px] mr-2)",
    ]

    if required {
      classes->Js.Array2.push("before::(inline-block content-asterisk text-danger mr-1)")->ignore
    }

    classes->atw
  }
}

external toDomElement: 'a => option<Dom.element> = "%identity"

type getDomNodeFromRef<'a> = 'a => option<Dom.element>

@react.component @genType
let make = (
  ~className=?,
  ~label=?,
  ~name: string,
  ~placeholder: option<string>=?,
  ~getDomNodeFromRef: option<getDomNodeFromRef<'a>>=?,
  ~required=?,
  ~children=?,
) => {
  let id = React.useMemo0(() => nanoid())
  let className = className->Twind.make
  let children = children->Belt.Option.getWithDefault(React.null)

  let ref = React.useRef(None)

  let methods = useFormContext()
  let registed = methods["register"](. name, {"required": required})
  React.useImperativeHandle0(registed["ref"], () => {
    switch getDomNodeFromRef {
    | Some(getDomNodeFromRef) => ref->getDomNodeFromRef
    | _ => ref.current->toDomElement
    }
  })

  let label = switch label {
  | Some(label) => {
      let className = Twind.makeLabel(~required=required->Belt.Option.getWithDefault(false))
      <label htmlFor=id className> {React.string(label)} </label>
    }
  | _ => React.null
  }

  let children = React.cloneElement(
    children,
    {
      "id": id,
      "ref": ref,
      "name": name,
      "placeholder": placeholder,
      "onChange": registed["onChange"],
      "onBlur": registed["onBlur"],
    },
  )

  let error = switch methods["formState"]["errors"]->Js.Dict.get(name) {
  | Some(error) => <span> {React.string(error["message"])} </span>
  | _ => React.null
  }

  <div className> label children error </div>
}
