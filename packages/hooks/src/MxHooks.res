let useGetState = (init: @uncurry (unit => 'state)) => {
  let (state, set) = React.useState(init)
  let ref = React.useRef(state)
  ref.current = state

  let get = React.useCallback(() => ref.current)

  (state, set, get)
}

include MxHooks_useObserveResize
