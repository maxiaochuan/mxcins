// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Twind from "twind";
import * as Css from "twind/css";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Caml_splice_call from "rescript/lib/es6/caml_splice_call.js";

var init = "flex p-0 text-sm";

var horizontal = "flex w-full min-w-full my-6 border-gray-300 border-t";

function make(className, _type, orientation, hasText, isDashed) {
  var classes = [init];
  var strs;
  if (_type === "horizontal") {
    if (hasText) {
      var match = orientation === "right" ? [
          "95%",
          "5%"
        ] : (
          orientation === "center" ? [
              "50%",
              "50%"
            ] : [
              "5%",
              "95%"
            ]
        );
      var pseudo = function (w) {
        return "relative top-1/2 content-empty border-t w-[" + w + "]";
      };
      var before = "before::(" + pseudo(match[0]) + ")";
      var after = "after::(" + pseudo(match[1]) + ")";
      strs = [
        horizontal,
        "border-t-0 font-medium text-base whitespace-nowrap text-center",
        Css.css({
              span: Twind.apply(["inline-block px-[1em]"])
            }),
        before,
        after
      ];
    } else {
      strs = [horizontal];
    }
  } else {
    strs = ["relative inline-block mx-2 top-[-0.06em] h-[0.9em] align-middle border-l"];
  }
  Caml_splice_call.spliceObjApply(classes, "push", [strs]);
  if (isDashed) {
    classes.push("border-dashed");
  }
  var match$1 = Twind.tw(Twind.apply(classes));
  if (className !== undefined) {
    return [
              match$1,
              className
            ].join(" ");
  } else {
    return match$1;
  }
}

var DividerTwind = {
  init: init,
  horizontal: horizontal,
  make: make
};

function MxRC_Divider(Props) {
  var className = Props.className;
  var _typeOpt = Props.type;
  var dashedOpt = Props.dashed;
  var orientationOpt = Props.orientation;
  var children = Props.children;
  var _type = _typeOpt !== undefined ? _typeOpt : "horizontal";
  var dashed = dashedOpt !== undefined ? dashedOpt : false;
  var orientation = orientationOpt !== undefined ? orientationOpt : "center";
  var hasText = children !== undefined;
  var className$1 = make(className, _type, orientation, hasText, dashed);
  var children$1 = children !== undefined ? React.createElement("span", undefined, Caml_option.valFromOption(children)) : null;
  return React.createElement("div", {
              className: className$1
            }, children$1);
}

var make$1 = MxRC_Divider;

export {
  DividerTwind ,
  make$1 as make,
  
}
/* react Not a pure module */
