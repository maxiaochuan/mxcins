/* TypeScript file generated from MxLibs__BreakpointPubSub.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as MxLibs__BreakpointPubSubBS__Es6Import from './MxLibs__BreakpointPubSub.bs';
const MxLibs__BreakpointPubSubBS: any = MxLibs__BreakpointPubSubBS__Es6Import;

// tslint:disable-next-line:interface-over-type-literal
export type BreakpointPublisher_breakpoint = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";

// tslint:disable-next-line:interface-over-type-literal
export type BreakpointPublisher_BreakpointCmp_t = BreakpointPublisher_breakpoint;

export const BreakpointPublisher_breakpoints: BreakpointPublisher_breakpoint[] = MxLibs__BreakpointPubSubBS.BreakpointPublisher.breakpoints;

export const subscribe: (subscriber:((_1:[BreakpointPublisher_BreakpointCmp_t, boolean]) => void)) => number = MxLibs__BreakpointPubSubBS.subscribe;

export const unsubscribe: (id:number) => void = MxLibs__BreakpointPubSubBS.unsubscribe;

export const BreakpointPublisher: { breakpoints: BreakpointPublisher_breakpoint[] } = MxLibs__BreakpointPubSubBS.BreakpointPublisher
