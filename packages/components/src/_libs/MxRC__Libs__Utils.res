module BreakpointUtils = {
  open MxLibs__BreakpointSub
  @genType
  type hash = {
    xs: option<int>,
    sm: option<int>,
    md: option<int>,
    lg: option<int>,
    xl: option<int>,
    xxl: option<int>,
  }

  // undefined null
  @module("./_externals.js") @val
  external makeBreakpointNumberHash: 'a => hash = "makeBreakpointNumberHash"
  @module("./_externals.js") @val
  external makeBreakpointNumberHashArray: 'a => (hash, hash) = "makeBreakpointNumberHashArray"
  @module("./_externals.js") @val
  external getCurrentBreakpointValue: ((hash, hash), Js.Array2.t<breakpoint>) => (int, int) =
    "getCurrentBreakpointValue"
}
