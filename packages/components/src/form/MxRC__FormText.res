module Input = MxRC__Input
module Field = MxRC__FormField

@react.component @genType
let make = (~className=?, ~name: string, ~placeholder=?, ~label=?, ~required=?) => {
  <Field name ?className ?label ?required ?placeholder> <Input /> </Field>
}
