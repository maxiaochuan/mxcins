/* TypeScript file generated from MxLibs__BreakpointSub.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as MxLibs__BreakpointSubBS__Es6Import from './MxLibs__BreakpointSub.bs';
const MxLibs__BreakpointSubBS: any = MxLibs__BreakpointSubBS__Es6Import;

// tslint:disable-next-line:interface-over-type-literal
export type BreakpointPubSub_breakpoint = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";

// tslint:disable-next-line:interface-over-type-literal
export type BreakpointPubSub_BreakpointCmp_t = BreakpointPubSub_breakpoint;

// tslint:disable-next-line:interface-over-type-literal
export type breakpoint = BreakpointPubSub_breakpoint;

export const breakpoints: BreakpointPubSub_breakpoint[] = MxLibs__BreakpointSubBS.breakpoints;

export const subscribe: (subscriber:((_1:BreakpointPubSub_BreakpointCmp_t) => void)) => number = MxLibs__BreakpointSubBS.subscribe;

export const unsubscribe: (id:number) => void = MxLibs__BreakpointSubBS.unsubscribe;
