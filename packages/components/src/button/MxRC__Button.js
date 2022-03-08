// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as MxRC__React from "../libs/MxRC__React.js";
import * as MxRC__Button__Twind from "./MxRC__Button__Twind.js";
import * as MxRC__Button__Utils from "./MxRC__Button__Utils.js";
import * as MxRC__ConfigProvider from "../MxRC__ConfigProvider.js";

var make = React.forwardRef(function (Props, param) {
      var partial_arg = Props.onClick;
      var partial_arg$1 = Props.children;
      var partial_arg$2 = Props.ghost;
      var partial_arg$3 = Props.disabled;
      var partial_arg$4 = Props.block;
      var partial_arg$5 = Props.danger;
      var partial_arg$6 = Props.shape;
      var partial_arg$7 = Props.type;
      var partial_arg$8 = Props.size;
      var partial_arg$9 = Props.style;
      var partial_arg$10 = Props.className;
      var _type = partial_arg$7 !== undefined ? partial_arg$7 : "default";
      var shape = partial_arg$6 !== undefined ? partial_arg$6 : "default";
      var danger = partial_arg$5 !== undefined ? partial_arg$5 : false;
      var block = partial_arg$4 !== undefined ? partial_arg$4 : false;
      var disabled = partial_arg$3 !== undefined ? partial_arg$3 : false;
      var ghost = partial_arg$2 !== undefined ? partial_arg$2 : false;
      var context = React.useContext(MxRC__ConfigProvider.ConfigContext.ctx);
      var size = Belt_Option.getWithDefault(partial_arg$8, context.size);
      var className = MxRC__Button__Twind.make(partial_arg$10, size, _type, shape, danger, ghost, block, disabled);
      var style = Belt_Option.getWithDefault(partial_arg$9, {});
      var onClick = function (evt) {
        if (partial_arg !== undefined && !disabled) {
          evt.preventDefault();
          Curry._1(partial_arg, evt);
          return ;
        }
        
      };
      var rendered = React.Children.map(Belt_Option.getWithDefault(partial_arg$1, null), (function (child) {
              if (!(MxRC__React.Children.isString(child) || MxRC__React.Children.isNumber(child))) {
                return child;
              }
              if (!(MxRC__React.Children.isString(child) && MxRC__Button__Utils.isTwoCNChar(child))) {
                return React.createElement("span", undefined, child);
              }
              var string = child.split("").join(" ");
              return React.createElement("span", undefined, string);
            }));
      var tmp = {
        className: className,
        style: style,
        disabled: disabled,
        onClick: onClick
      };
      var tmp$1 = Belt_Option.map((param == null) ? undefined : Caml_option.some(param), (function (prim) {
              return prim;
            }));
      if (tmp$1 !== undefined) {
        tmp.ref = Caml_option.valFromOption(tmp$1);
      }
      return React.createElement("button", tmp, rendered);
    });

export {
  make ,
  
}
/* make Not a pure module */
