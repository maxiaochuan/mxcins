module ConfigContext = {
  type size = [#default | #small | #large]
  type context = {size: size}

  let ctx = React.createContext({size: #default})

  module Provider = {
    let provider = React.Context.provider(ctx)
    @react.component
    let make = (~value: context, ~children) => {
      React.createElement(provider, {"value": value, "children": children})
    }
  }
}

let init = () => MxRC__Libs__Twind.setup(MxRC__Libs__Twind.conf)

init()

open ConfigContext

@react.component @genType
let make = (~size=#default, ~children=React.null) => {
  let value = React.useMemo1(() => {size: size}, [size])

  <> <Provider value> children </Provider> </>
}
