module Password = MxRC__Input__Password
module Field = MxRC__FormField

@react.component @genType
let make = (~className=?, ~name: string, ~placeholder=?, ~label=?, ~required=?) => {
  let getDomNodeFromRef = (inputRef: React.ref<option<Password.Input.inputRef>>) => {
    let current = inputRef.current->Belt.Option.getExn
    current.input
    ->Belt.Option.map(input => input->Webapi.Dom.HtmlInputElement.asNode->Webapi.Dom.Element.ofNode)
    ->Belt.Option.getUnsafe
  }
  <Field name ?className ?label ?required ?placeholder getDomNodeFromRef> <Password /> </Field>
}
