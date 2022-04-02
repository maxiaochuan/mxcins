module Password = MxRC__Input__Password
module Field = MxRC__FormField

@react.component @genType
let make = (
  ~className=?,
  ~name: string,
  ~placeholder=?,
  ~label=?,
  ~hideLabel=?,
  ~required=?,
  ~register=?,
  ~fieldProps=?,
) => {
  <Field name ?className ?label ?required ?placeholder ?register ?hideLabel>
    {React.createElement(Password.make, fieldProps->Belt.Option.getUnsafe)}
  </Field>
}
