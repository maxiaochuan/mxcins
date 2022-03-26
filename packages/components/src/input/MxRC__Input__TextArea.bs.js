// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as MxRC__Input__Twind from "./MxRC__Input__Twind.bs.js";
import * as MxRC__ConfigProvider from "../config-provider/MxRC__ConfigProvider.bs.js";

function MxRC__Input__TextArea(Props) {
  var size = Props.size;
  var className = Props.className;
  var rows = Props.rows;
  var placeholder = Props.placeholder;
  var maxLength = Props.maxLength;
  var value = Props.value;
  var defaultValue = Props.defaultValue;
  var onChange = Props.onChange;
  var disabledOpt = Props.disabled;
  var disabled = disabledOpt !== undefined ? disabledOpt : false;
  var size$1 = MxRC__ConfigProvider.ConfigContext.useSizeConfig(size);
  var match = React.useState(function () {
        return Belt_Option.getWithDefault(defaultValue, "");
      });
  var set = match[1];
  var isControled = !Belt_Option.isNone(value);
  var value$1 = Belt_Option.getWithDefault(value, match[0]);
  var onChange$1 = function ($$event) {
    var target = $$event.target;
    var next = target.value;
    var v = Belt_Option.getWithDefault(next, "");
    var enabled = maxLength !== undefined ? (maxLength + 1 | 0) > v.length : true;
    if (enabled) {
      if (!isControled) {
        Curry._1(set, (function (param) {
                return v;
              }));
      }
      return Belt_Option.forEach(onChange, (function (fn) {
                    return Curry._1(fn, $$event);
                  }));
    }
    
  };
  var className$1 = MxRC__Input__Twind.makeTextArea(className, size$1, false, disabled);
  var tmp = {
    className: className$1,
    disabled: disabled,
    value: value$1,
    onChange: onChange$1
  };
  if (placeholder !== undefined) {
    tmp.placeholder = Caml_option.valFromOption(placeholder);
  }
  if (rows !== undefined) {
    tmp.rows = Caml_option.valFromOption(rows);
  }
  return React.createElement("textarea", tmp);
}

var Twind;

var Config;

var make = MxRC__Input__TextArea;

export {
  Twind ,
  Config ,
  make ,
  
}
/* react Not a pure module */
