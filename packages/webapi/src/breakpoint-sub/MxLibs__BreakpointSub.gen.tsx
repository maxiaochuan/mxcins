/* TypeScript file generated from MxLibs__BreakpointSub.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as MxLibs__BreakpointSubBS__Es6Import from './MxLibs__BreakpointSub.bs';
const MxLibs__BreakpointSubBS: any = MxLibs__BreakpointSubBS__Es6Import;

// tslint:disable-next-line:interface-over-type-literal
export type BreakpointPublisher_breakpoint = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";

// tslint:disable-next-line:interface-over-type-literal
export type BreakpointPublisher_BreakpointCmp_t = BreakpointPublisher_breakpoint;

export const BreakpointPublisher_breakpoints: BreakpointPublisher_breakpoint[] = MxLibs__BreakpointSubBS.BreakpointPublisher.breakpoints;

export const breakpoints: BreakpointPublisher_breakpoint[] = MxLibs__BreakpointSubBS.breakpoints;

export const subscribe: (subscriber:((_1:BreakpointPublisher_BreakpointCmp_t) => void)) => number = MxLibs__BreakpointSubBS.subscribe;

export const unsubscribe: (id:number) => void = MxLibs__BreakpointSubBS.unsubscribe;

export const BreakpointPublisher: { breakpoints: BreakpointPublisher_breakpoint[] } = MxLibs__BreakpointSubBS.BreakpointPublisher
