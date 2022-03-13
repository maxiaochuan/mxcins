/* TypeScript file generated from MxLibs__SingleBreakpointPublisher.res by genType. */
/* eslint-disable import/first */


// @ts-ignore: Implicit any on import
import * as MxLibs__SingleBreakpointPublisherBS__Es6Import from './MxLibs__SingleBreakpointPublisher.bs';
const MxLibs__SingleBreakpointPublisherBS: any = MxLibs__SingleBreakpointPublisherBS__Es6Import;

// tslint:disable-next-line:interface-over-type-literal
export type breakpoint = "xxl" | "xl" | "lg" | "md" | "sm" | "xs";

// tslint:disable-next-line:interface-over-type-literal
export type BreakpointCmp_t = breakpoint;

export const breakpoints: breakpoint[] = MxLibs__SingleBreakpointPublisherBS.breakpoints;

export const subscribe: (func:((_1:BreakpointCmp_t) => void)) => number = MxLibs__SingleBreakpointPublisherBS.subscribe;

export const unsubscribe: (id:number) => void = MxLibs__SingleBreakpointPublisherBS.unsubscribe;
