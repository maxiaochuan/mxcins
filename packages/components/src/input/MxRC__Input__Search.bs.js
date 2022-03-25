// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as MxRC__Input from "./MxRC__Input.bs.js";
import * as MxRC__Button from "../button/MxRC__Button.bs.js";
import * as Icons from "@ant-design/icons";
import * as MxRC__Libs__Twind from "../_libs/MxRC__Libs__Twind.bs.js";

function makeSearch(param) {
  return MxRC__Libs__Twind.atw(undefined, ["rounded-l-none hover:(z-1) focus:(z-1) active:(z-1) text-text-secondary"]);
}

var InputSearchTwind = {
  makeSearch: makeSearch
};

function initRef_focus(param) {
  
}

function initRef_blur(param) {
  
}

var initRef = {
  focus: initRef_focus,
  blur: initRef_blur,
  input: undefined
};

function MxRC__Input__Search(Props) {
  var size = Props.size;
  var groupStyle = Props.style;
  var placeholder = Props.placeholder;
  var addonBefore = Props.addonBefore;
  var prefix = Props.prefix;
  var suffix = Props.suffix;
  var value = Props.value;
  var onChange = Props.onChange;
  var allowClear = Props.allowClear;
  var onSearch = Props.onSearch;
  var inputRef = React.useRef(initRef);
  var onSearch$1 = function ($$event) {
    return Belt_Option.forEach(onSearch, (function (fn) {
                  return Belt_Option.forEach(inputRef.current.input, (function (input) {
                                return fn(input.value, $$event);
                              }));
                }));
  };
  var className = MxRC__Libs__Twind.atw(undefined, ["rounded-l-none hover:(z-1) focus:(z-1) active:(z-1) text-text-secondary"]);
  var icon = React.createElement(Icons.SearchOutlined, {});
  var onClick = onSearch$1;
  var addonAfter = React.createElement(MxRC__Button.make, {
        className: className,
        icon: icon,
        onClick: onClick
      });
  var onPressEnter = onSearch$1;
  var tmp = {
    addonAfter: addonAfter,
    addonAfterNoStyle: true,
    onPressEnter: onPressEnter,
    ref: inputRef
  };
  if (size !== undefined) {
    tmp.size = Caml_option.valFromOption(size);
  }
  if (groupStyle !== undefined) {
    tmp.groupStyle = Caml_option.valFromOption(groupStyle);
  }
  if (placeholder !== undefined) {
    tmp.placeholder = Caml_option.valFromOption(placeholder);
  }
  if (addonBefore !== undefined) {
    tmp.addonBefore = Caml_option.valFromOption(addonBefore);
  }
  if (prefix !== undefined) {
    tmp.prefix = Caml_option.valFromOption(prefix);
  }
  if (suffix !== undefined) {
    tmp.suffix = Caml_option.valFromOption(suffix);
  }
  if (onChange !== undefined) {
    tmp.onChange = Caml_option.valFromOption(onChange);
  }
  if (value !== undefined) {
    tmp.value = Caml_option.valFromOption(value);
  }
  if (allowClear !== undefined) {
    tmp.allowClear = Caml_option.valFromOption(allowClear);
  }
  return React.createElement(MxRC__Input.make, tmp);
}

var Input;

var Button;

var make = MxRC__Input__Search;

export {
  Input ,
  Button ,
  InputSearchTwind ,
  initRef ,
  make ,
  
}
/* react Not a pure module */
