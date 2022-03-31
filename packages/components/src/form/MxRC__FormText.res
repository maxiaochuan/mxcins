module Input = MxRC__Input
module Field = MxRC__FormField

let initRef: Input.inputRef = {
  focus: () => (),
  blur: () => (),
  input: None,
}

@react.component @genType
let make = (~className=?, ~name: string, ~placeholder=?, ~label=?, ~required=?) => {
  let getDomNodeFromRef = (inputRef: React.ref<option<Input.inputRef>>) => {
    let current = inputRef.current->Belt.Option.getExn
    current.input
    ->Belt.Option.map(input => input->Webapi.Dom.HtmlInputElement.asNode->Webapi.Dom.Element.ofNode)
    ->Belt.Option.getUnsafe
  }
  <Field name ?className ?label ?required ?placeholder getDomNodeFromRef> <Input /> </Field>
}
