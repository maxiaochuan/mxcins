module ConfigContext = {
  type size = [#default | #small | #large]
  type value = {size: size}

  let context = React.createContext({size: #default})

  let make = (~size) => {{size: size}}

  @genType
  let useSizeConfig = (size: option<size>) => {
    let ctx = React.useContext(context)

    React.useMemo2(() => size->Belt.Option.getWithDefault(ctx.size), (size, ctx.size))
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
let setup = () => MxRC__Libs__Twind.setup(MxRC__Libs__Twind.conf)

@react.component @genType
let make = (~size=#default, ~children=React.null) => {
  let value = React.useMemo1(() => ConfigContext.make(~size), [size])

  <> <ConfigContext.Provider value> children </ConfigContext.Provider> </>
}
