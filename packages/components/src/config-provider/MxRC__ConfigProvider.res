module ConfigContext = {
  let getPartalRoot = () => {
    open Webapi.Dom
    open Belt.Option

    let id = "__mx_partial_root"
    switch document->Document.querySelector("#" ++ id) {
    | None => {
        let root = document->Document.createElement("div")
        root->Element.setId(id)
        document
        ->Document.asHtmlDocument
        ->forEach(document =>
          document->HtmlDocument.body->forEach(body => body->Element.appendChild(~child=root))
        )
        root
      }
    | Some(root) => root
    }
  }

  type size = [#default | #small | #large]
  type formErrorMessages = Js.Dict.t<string>
  type value = {size: size, formErrorMessages: formErrorMessages}

  let initSize = #default
  let initFormErrorMessages = Js.Dict.fromArray([("required", "{{label}} is required.")])
  let initContext = {size: #default, formErrorMessages: initFormErrorMessages}

  let makeContext = (~size, ~formErrorMessages: option<formErrorMessages>) => {
    let errors = formErrorMessages->Belt.Option.getWithDefault(Js.Dict.empty())
    {
      size: size,
      formErrorMessages: initFormErrorMessages
      ->Js.Dict.entries
      ->Js.Array2.concat(errors->Js.Dict.entries)
      ->Js.Dict.fromArray,
    }
  }

  let context = React.createContext(initContext)

  @genType
  let useSizeConfig = (size: option<size>) => {
    let ctx = React.useContext(context)
    React.useMemo2(() => size->Belt.Option.getWithDefault(ctx.size), (size, ctx.size))
  }

  @genType
  let useformErrorMessagesConfig = () => {
    let ctx = React.useContext(context)
    React.useMemo1(() => ctx.formErrorMessages, [ctx.formErrorMessages])
  }

  module Provider = {
    let provider = React.Context.provider(context)
    @react.component
    let make = (~value, ~children) => {
      React.createElement(provider, {"value": value, "children": children})
    }
  }
}

@genType
let setup = () => MxRC__Twind.setup(MxRC__Twind.conf)

@react.component @genType
let make = (
  ~size=#default,
  ~formErrorMessages: option<ConfigContext.formErrorMessages>=?,
  ~children=React.null,
) => {
  let value = React.useMemo2(
    () => ConfigContext.makeContext(~size, ~formErrorMessages),
    (size, formErrorMessages->Js.Json.stringifyAny),
  )

  <> <ConfigContext.Provider value> children </ConfigContext.Provider> </>
}
