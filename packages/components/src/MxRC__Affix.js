// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as MxHooks from "@mxcins/hooks/src/MxHooks.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as MxLibs__Raf from "@mxcins/libs/src/MxLibs__Raf.js";

function getDomRect(node) {
  if (node === undefined) {
    return {
            top: 0,
            bottom: window.innerHeight,
            width: 0,
            height: 0
          };
  }
  var rect = Caml_option.valFromOption(node).getBoundingClientRect();
  return {
          top: rect.top | 0,
          bottom: rect.bottom | 0,
          width: rect.width | 0,
          height: rect.height | 0
        };
}

function getFixedTop(targetRect, containerRect, offsetTop) {
  if (offsetTop !== undefined && targetRect.top > (containerRect.top - offsetTop | 0)) {
    return offsetTop + targetRect.top | 0;
  }
  
}

function getFixedBottom(targetRect, containerRect, offsetBottom) {
  if (offsetBottom === undefined) {
    return ;
  }
  if (targetRect.bottom >= (containerRect.bottom + offsetBottom | 0)) {
    return ;
  }
  var offset = window.innerHeight - targetRect.bottom | 0;
  return offsetBottom + offset | 0;
}

var AffixUtils = {
  getDomRect: getDomRect,
  getFixedTop: getFixedTop,
  getFixedBottom: getFixedBottom
};

function MxRC__Affix(Props) {
  var offsetTop = Props.offsetTop;
  var offsetBottom = Props.offsetBottom;
  var tar = Props.target;
  var children = Props.children;
  var containerRef = React.useRef(null);
  var fixedRef = React.useRef(null);
  var updateRef = React.useRef(function (param) {
        
      });
  var match = MxHooks.useGetState(function (param) {
        return /* Unfixed */0;
      });
  var setState = match[1];
  var state = match[0];
  var initOffsetTop = offsetTop !== undefined ? offsetTop : 0;
  var target = tar !== undefined ? Caml_option.nullable_to_opt(Curry._1(tar, undefined)) : undefined;
  React.useEffect((function () {
          updateRef.current = MxLibs__Raf.throttle(undefined, (function (param) {
                  var container = containerRef.current;
                  if (container == null) {
                    return ;
                  }
                  var targetRect = getDomRect(target);
                  var containerRect = getDomRect(Caml_option.some(container));
                  console.log(target);
                  var fixedTop = getFixedTop(targetRect, containerRect, initOffsetTop);
                  var fixedBottom = getFixedBottom(targetRect, containerRect, offsetBottom);
                  var next;
                  var exit = 0;
                  if (fixedTop !== undefined || fixedBottom !== undefined) {
                    exit = 1;
                  } else {
                    next = /* Unfixed */0;
                  }
                  if (exit === 1) {
                    next = /* Fixed */{
                      fixed: {
                        position: "fixed",
                        top: fixedTop !== undefined ? String(fixedTop) + "px" : "initial",
                        bottom: fixedBottom !== undefined ? String(fixedBottom) + "px" : "initial",
                        width: String(containerRect.width) + "px",
                        height: String(containerRect.height) + "px",
                        zIndex: "10"
                      },
                      placeholder: {
                        width: String(containerRect.width) + "px",
                        height: String(containerRect.height) + "px"
                      }
                    };
                  }
                  return Curry._1(setState, (function (prev) {
                                if (prev) {
                                  if (next) {
                                    return prev;
                                  } else {
                                    return next;
                                  }
                                } else if (next) {
                                  return next;
                                } else {
                                  return /* Unfixed */0;
                                }
                              }));
                }));
          Curry._1(updateRef.current, undefined);
          
        }), [
        target,
        initOffsetTop,
        offsetBottom
      ]);
  var placeholder = state ? React.createElement("div", {
          style: {
            bottom: state.fixed.bottom,
            height: state.fixed.height,
            position: state.fixed.position,
            top: state.fixed.top,
            width: state.fixed.width,
            zIndex: state.fixed.zIndex
          }
        }) : null;
  var child = children !== undefined ? Caml_option.valFromOption(children) : null;
  return React.createElement("div", {
              ref: containerRef
            }, placeholder, React.createElement("div", {
                  ref: fixedRef,
                  style: state ? ({
                        bottom: state.fixed.bottom,
                        height: state.fixed.height,
                        position: state.fixed.position,
                        top: state.fixed.top,
                        width: state.fixed.width,
                        zIndex: state.fixed.zIndex
                      }) : ({})
                }, child));
}

var make = MxRC__Affix;

export {
  AffixUtils ,
  make ,
  
}
/* react Not a pure module */
