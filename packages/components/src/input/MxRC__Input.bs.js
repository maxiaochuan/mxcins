// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as Caml_exceptions from "rescript/lib/es6/caml_exceptions.js";
import * as Icons from "@ant-design/icons";
import * as MxRC__Input__Twind from "./MxRC__Input__Twind.bs.js";
import * as MxRC__ConfigProvider from "../config-provider/MxRC__ConfigProvider.bs.js";
import * as Webapi__Dom__HtmlElement from "rescript-webapi/src/Webapi/Dom/Webapi__Dom__HtmlElement.bs.js";
import * as Webapi__Dom__HtmlInputElement from "rescript-webapi/src/Webapi/Dom/Webapi__Dom__HtmlInputElement.bs.js";

var AddonAfterConflict = /* @__PURE__ */Caml_exceptions.create("MxRC__Input.AddonAfterConflict");

var make = React.forwardRef(function (Props, ref) {
      var size = Props.size;
      var className = Props.className;
      var groupStyle = Props.groupStyle;
      var placeholder = Props.placeholder;
      var addonBefore = Props.addonBefore;
      var addonBeforeNoStyleOpt = Props.addonBeforeNoStyle;
      var addonAfter = Props.addonAfter;
      var addonAfterNoStyleOpt = Props.addonAfterNoStyle;
      var prefix = Props.prefix;
      var suffix = Props.suffix;
      var onPressEnter = Props.onPressEnter;
      var onKeyDown = Props.onKeyDown;
      var onFocus = Props.onFocus;
      var onBlur = Props.onBlur;
      var onChange = Props.onChange;
      var value = Props.value;
      var defaultValue = Props.defaultValue;
      var allowClearOpt = Props.allowClear;
      var addonBeforeNoStyle = addonBeforeNoStyleOpt !== undefined ? addonBeforeNoStyleOpt : false;
      var addonAfterNoStyle = addonAfterNoStyleOpt !== undefined ? addonAfterNoStyleOpt : false;
      var allowClear = allowClearOpt !== undefined ? allowClearOpt : false;
      var context = React.useContext(MxRC__ConfigProvider.ConfigContext.ctx);
      var size$1 = Belt_Option.getWithDefault(size, context.size);
      var match = React.useState(function () {
            return Belt_Option.getWithDefault(defaultValue, "");
          });
      var set = match[1];
      var isControled = !Belt_Option.isNone(value);
      var value$1 = Belt_Option.getWithDefault(value, match[0]);
      var match$1 = React.useState(function () {
            return false;
          });
      var setFocused = match$1[1];
      var focused = match$1[0];
      var inputRef = React.useRef(null);
      var focus = function (param) {
        return Belt_Option.forEach(Caml_option.nullable_to_opt(inputRef.current), (function (input) {
                      return Belt_Option.forEach(Webapi__Dom__HtmlElement.ofElement(input), (function (input) {
                                    Curry._1(setFocused, (function (param) {
                                            return true;
                                          }));
                                    input.focus();
                                    
                                  }));
                    }));
      };
      var blur = function (param) {
        return Belt_Option.forEach(Caml_option.nullable_to_opt(inputRef.current), (function (input) {
                      return Belt_Option.forEach(Webapi__Dom__HtmlElement.ofElement(input), (function (input) {
                                    Curry._1(setFocused, (function (param) {
                                            return false;
                                          }));
                                    input.blur();
                                    
                                  }));
                    }));
      };
      React.useImperativeHandle(ref, (function () {
              return {
                      focus: focus,
                      blur: blur,
                      input: Belt_Option.map(Caml_option.nullable_to_opt(inputRef.current), (function (input) {
                              return Curry._1(Webapi__Dom__HtmlInputElement.ofElement, input);
                            }))
                    };
            }), []);
      var onReset = function ($$event) {
        if (!isControled) {
          Curry._1(set, (function (param) {
                  return "";
                }));
        }
        focus(undefined);
        return Belt_Option.forEach(onChange, (function (fn) {
                      return Belt_Option.forEach(Caml_option.nullable_to_opt(inputRef.current), (function (input) {
                                    var type_ = $$event.type;
                                    if (type_ === "click") {
                                      return Belt_Option.forEach(Curry._1(Webapi__Dom__HtmlInputElement.ofElement, input.cloneNode(true)), (function (clone) {
                                                    clone.value = "";
                                                    var makeEvent = (function (e, value) {
                return Object.create(e, {
                  target: { value: value },
                  currentTarget: { value: value },
                })
              });
                                                    return Curry._1(fn, makeEvent($$event, clone));
                                                  }));
                                    }
                                    
                                  }));
                    }));
      };
      var onChange$1 = function ($$event) {
        if (!isControled) {
          var next = $$event.target;
          Curry._1(set, (function (param) {
                  return next.value;
                }));
        }
        return Belt_Option.forEach(onChange, (function (fn) {
                      return Curry._1(fn, $$event);
                    }));
      };
      var onKeyDown$1 = function ($$event) {
        if ($$event.key === "Enter") {
          Belt_Option.forEach(onPressEnter, (function (fn) {
                  return Curry._1(fn, $$event);
                }));
        }
        return Belt_Option.forEach(onKeyDown, (function (fn) {
                      return Curry._1(fn, $$event);
                    }));
      };
      var onFocus$1 = function ($$event) {
        Curry._1(setFocused, (function (param) {
                return true;
              }));
        return Belt_Option.forEach(onFocus, (function (fn) {
                      return Curry._1(fn, $$event);
                    }));
      };
      var onBlur$1 = function ($$event) {
        Curry._1(setFocused, (function (param) {
                return false;
              }));
        return Belt_Option.forEach(onBlur, (function (fn) {
                      return Curry._1(fn, $$event);
                    }));
      };
      var hasfix = Belt_Option.isSome(prefix) || Belt_Option.isSome(suffix) || allowClear;
      var hasaddon = Belt_Option.isSome(addonBefore) || Belt_Option.isSome(addonAfter);
      var className$1 = hasfix ? MxRC__Input__Twind.makeNoStyle(undefined) : MxRC__Input__Twind.make(className, size$1, hasaddon, false, focused);
      var tmp = {
        ref: inputRef,
        className: className$1,
        type: "text",
        value: value$1,
        onKeyDown: onKeyDown$1,
        onFocus: onFocus$1,
        onBlur: onBlur$1,
        onChange: onChange$1
      };
      if (placeholder !== undefined) {
        tmp.placeholder = Caml_option.valFromOption(placeholder);
      }
      var child = React.createElement("input", tmp);
      var child$1;
      if (hasfix) {
        var prefix$1;
        if (prefix !== undefined) {
          var className$2 = MxRC__Input__Twind.makeFixed("prefix");
          prefix$1 = React.createElement("span", {
                className: className$2
              }, Caml_option.valFromOption(prefix));
        } else {
          prefix$1 = null;
        }
        var suffix$1;
        if (suffix !== undefined) {
          if (allowClear) {
            throw {
                  RE_EXN_ID: AddonAfterConflict,
                  Error: new Error()
                };
          }
          var className$3 = MxRC__Input__Twind.makeFixed("suffix");
          suffix$1 = React.createElement("span", {
                className: className$3
              }, Caml_option.valFromOption(suffix));
        } else if (allowClear) {
          var className$4 = MxRC__Input__Twind.makeFixed("suffix");
          var className$5 = MxRC__Input__Twind.makeClear(undefined);
          var visibility = value$1.length > 0 ? "visible" : "hidden";
          var style = {
            visibility: visibility
          };
          var onMouseDown = function ($$event) {
            $$event.preventDefault();
            
          };
          var icon = React.createElement("span", {
                className: className$5,
                role: "button",
                style: style,
                onClick: onReset,
                onMouseDown: onMouseDown
              }, React.createElement(Icons.CloseCircleFilled, {}));
          suffix$1 = React.createElement("span", {
                className: className$4
              }, icon);
        } else {
          suffix$1 = null;
        }
        var className$6 = MxRC__Input__Twind.make(className, size$1, hasaddon, true, focused);
        var onMouseUp = function (param) {
          return focus(undefined);
        };
        child$1 = React.createElement("span", {
              className: className$6,
              onMouseUp: onMouseUp
            }, prefix$1, child, suffix$1);
      } else {
        child$1 = child;
      }
      if (!hasaddon) {
        return child$1;
      }
      var before;
      if (addonBefore !== undefined) {
        var className$7 = MxRC__Input__Twind.makeAddon(addonBeforeNoStyle);
        before = React.createElement("span", {
              className: className$7
            }, Caml_option.valFromOption(addonBefore));
      } else {
        before = null;
      }
      var after;
      if (addonAfter !== undefined) {
        var className$8 = MxRC__Input__Twind.makeAddon(addonAfterNoStyle);
        after = React.createElement("span", {
              className: className$8
            }, Caml_option.valFromOption(addonAfter));
      } else {
        after = null;
      }
      var match$2 = MxRC__Input__Twind.makeGroup(undefined);
      var tmp$1 = {
        className: match$2[0]
      };
      if (groupStyle !== undefined) {
        tmp$1.style = Caml_option.valFromOption(groupStyle);
      }
      return React.createElement("span", tmp$1, React.createElement("span", {
                      className: match$2[1]
                    }, before, child$1, after));
    });

var Twind;

export {
  Twind ,
  AddonAfterConflict ,
  make ,
  
}
/* make Not a pure module */
