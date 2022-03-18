// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Twind from "twind";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as MxRC__Grid__Row from "./MxRC__Grid__Row.bs.js";

var init = "block";

function make(className, span) {
  var classes = [init];
  Belt_Option.forEach(span, (function (span) {
          classes.push("w-" + span.toString() + "/24");
          
        }));
  var match = Twind.tw(Twind.apply(classes));
  if (className !== undefined) {
    return [
              match,
              className
            ].join(" ");
  } else {
    return match;
  }
}

var GridColTwind = {
  init: init,
  make: make
};

function MxRC__Grid__Col(Props) {
  var className = Props.className;
  var style = Props.style;
  var span = Props.span;
  var flex = Props.flex;
  var children = Props.children;
  var context = React.useContext(MxRC__Grid__Row.GridRowContext.ctx);
  var className$1 = make(className, span);
  var children$1 = Belt_Option.getWithDefault(children, null);
  var n = context.spacex;
  var style$1 = n !== 0 ? Object.assign({}, Belt_Option.getWithDefault(style, {}), {
          paddingRight: (n / 2 | 0).toString() + "px",
          paddingLeft: (n / 2 | 0).toString() + "px"
        }) : Belt_Option.getWithDefault(style, {});
  var style$2;
  if (flex !== undefined) {
    var f = /^\d+$/.test(flex) ? flex + " " + flex + " auto" : (
        /^\d+(\.\d+)?(px|em|rem|%)$/.test(flex) ? "0 0 " + flex : flex
      );
    style$2 = Object.assign({}, style$1, {
          flex: f
        });
  } else {
    style$2 = style$1;
  }
  return React.createElement("div", {
              className: className$1,
              style: style$2
            }, children$1);
}

var make$1 = MxRC__Grid__Col;

export {
  GridColTwind ,
  make$1 as make,
  
}
/* react Not a pure module */
