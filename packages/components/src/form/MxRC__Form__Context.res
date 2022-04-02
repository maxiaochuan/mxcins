module FormContext = {
  type value = {colspan: (int, int)}

  let initColspan = (6, 18)
  let initContext = {colspan: initColspan}

  let makeContext = (~colspan) => {
    {
      colspan: colspan,
    }
  }

  let context = React.createContext(initContext)

  let useColspanConfig = () => {
    let ctx = React.useContext(context)
    React.useMemo1(() => ctx.colspan, [ctx.colspan])
  }

  module Provider = {
    let provider = React.Context.provider(context)
    @react.component
    let make = (~value, ~children) => {
      React.createElement(provider, {"value": value, "children": children})
    }
  }
}
