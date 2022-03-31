@val @module("nanoid")
external nanoid: unit => string = "nanoid"

module BreakpointUtils = {
  open MxWebapi.BreakpointSub

  @genType.as("BreakpointRecord")
  type breakpointRecord = {
    xxl: int,
    xl: int,
    lg: int,
    md: int,
    sm: int,
    xs: int,
  }

  @module("./_externals.js") @val
  external anyToBreakpointRecord: 'a => 'b = "anyToBreakpointRecord"
  @module("./_externals.js") @val
  external anyToTwoBreakpointRecord: 'a => 'b = "anyToTwoBreakpointRecord"
  @module("./_externals.js") @val
  external isBreakpointRecord: 'a => bool = "isBreakpointRecord"
  @module("./_externals.js") @val
  external makeSpacingByBreakpoints: ('a, array<breakpoint>) => (int, int) =
    "makeSpacingByBreakpoints"
}
