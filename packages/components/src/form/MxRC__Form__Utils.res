module FormError = {
  let makeMessage = (~name: string, ~label: option<string>, ~message: string) => {
    message->Js.String2.replace("{{label}}", label->Belt.Option.getWithDefault(name))
  }
}
