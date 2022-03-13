/* TypeScript file generated from MxLibs__SingleBreakpointPublisher.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as MxLibs__SingleBreakpointPublisherBS__Es6Import from './MxLibs__SingleBreakpointPublisher.bs';
const MxLibs__SingleBreakpointPublisherBS: any = MxLibs__SingleBreakpointPublisherBS__Es6Import;

// tslint:disable-next-line:interface-over-type-literal
export type QueryListDispatcher_breakpoint = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";

export const QueryListDispatcher_breakpoints: QueryListDispatcher_breakpoint[] = MxLibs__SingleBreakpointPublisherBS.QueryListDispatcher.breakpoints;

export const subscribe: (subscriber:((_1:QueryListDispatcher_breakpoint) => void)) => number = MxLibs__SingleBreakpointPublisherBS.subscribe;

export const unsubscribe: (id:number) => void = MxLibs__SingleBreakpointPublisherBS.unsubscribe;

export const QueryListDispatcher: { breakpoints: QueryListDispatcher_breakpoint[] } = MxLibs__SingleBreakpointPublisherBS.QueryListDispatcher
