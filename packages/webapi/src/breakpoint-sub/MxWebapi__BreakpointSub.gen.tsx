/* TypeScript file generated from MxWebapi__BreakpointSub.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as MxWebapi__BreakpointSubBS__Es6Import from './MxWebapi__BreakpointSub.bs';
const MxWebapi__BreakpointSubBS: any = MxWebapi__BreakpointSubBS__Es6Import;

// tslint:disable-next-line:interface-over-type-literal
export type BreakpointPubSub_breakpoint = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";

// tslint:disable-next-line:interface-over-type-literal
export type BreakpointPubSub_BreakpointCmp_t = BreakpointPubSub_breakpoint;

// tslint:disable-next-line:interface-over-type-literal
export type breakpoint = BreakpointPubSub_breakpoint;
export type BreakpointType = breakpoint;

// tslint:disable-next-line:interface-over-type-literal
export type subscriber = (_1:breakpoint[]) => void;

export const breakpoints: BreakpointPubSub_breakpoint[] = MxWebapi__BreakpointSubBS.breakpoints;

export const subscribe: (subscriber:((_1:BreakpointPubSub_BreakpointCmp_t[]) => void)) => number = MxWebapi__BreakpointSubBS.subscribe;

export const unsubscribe: (id:number) => void = MxWebapi__BreakpointSubBS.unsubscribe;
