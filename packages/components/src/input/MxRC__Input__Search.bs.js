// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as MxRC__Input from "./MxRC__Input.bs.js";
import * as MxRC__Button from "../button/MxRC__Button.bs.js";
import * as Icons from "@ant-design/icons";
import * as MxRC__Libs__Twind from "../_libs/MxRC__Libs__Twind.bs.js";

function makeSearch(param) {
  return MxRC__Libs__Twind.atw(undefined, ["rounded-l-none hover:(z-1) focus:(z-1) active:(z-1)"]);
}

var InputSearchTwind = {
  makeSearch: makeSearch
};

function MxRC__Input__Search(Props) {
  var size = Props.size;
  var placeholder = Props.placeholder;
  var addonBefore = Props.addonBefore;
  var onSearch = Props.onSearch;
  var inputRef = React.useRef(null);
  var onSearch$1 = function ($$event) {
    return Belt_Option.forEach(onSearch, (function (fn) {
                  var input = inputRef.current;
                  return Belt_Option.forEach((input == null) ? undefined : Caml_option.some(input), (function (input) {
                                var v = input.value;
                                return Curry._2(fn, Belt_Option.getWithDefault(v, ""), $$event);
                              }));
                }));
  };
  var onPressEnter = onSearch$1;
  var className = MxRC__Libs__Twind.atw(undefined, ["rounded-l-none hover:(z-1) focus:(z-1) active:(z-1)"]);
  var icon = React.createElement(Icons.SearchOutlined, {});
  var onClick = onSearch$1;
  var addonAfter = React.createElement(MxRC__Button.make, {
        className: className,
        icon: icon,
        onClick: onClick
      });
  var tmp = {
    addonAfter: addonAfter,
    onPressEnter: onPressEnter,
    ref: inputRef
  };
  if (size !== undefined) {
    tmp.size = Caml_option.valFromOption(size);
  }
  if (placeholder !== undefined) {
    tmp.placeholder = Caml_option.valFromOption(placeholder);
  }
  if (addonBefore !== undefined) {
    tmp.addonBefore = Caml_option.valFromOption(addonBefore);
  }
  return React.createElement(MxRC__Input.make, tmp);
}

var Input;

var InputGroup;

var Button;

var make = MxRC__Input__Search;

export {
  Input ,
  InputGroup ,
  Button ,
  InputSearchTwind ,
  make ,
  
}
/* react Not a pure module */
