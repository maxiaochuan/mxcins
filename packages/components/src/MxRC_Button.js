// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Twind from "twind";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as MxRC__ConfigProvider from "./MxRC__ConfigProvider.js";

var init = "\n    relative\n    inline\n    font-normal\n    text(base center text)\n    whitespace-nowrap\n    border(1 gray-300)\n    rounded\n    px-3\n    transition\n  ";

var disabled = "\n    disabled:cursor-not-allowed\n    disabled:text(gray-400 hover:gray-400 focus:gray-400 active:gray-400)\n    disabled:bg(gray-100 hover:gray-100 focus:gray-100 active:gray-100)\n    disabled:border(gray-300 hover:gray-300 focus:gray-300 active:gray-300)\n  ";

var def = "\n    text(hover:primary-hover focus:primary-hover active:primary-active)\n    border(hover:primary-hover focus:primary-hover active:primary-active)\n  ";

var primary = "\n    text-white\n    bg(primary hover:primary-hover focus:primary-hover active:primary-active)\n    border(primary hover:primary-hover focus:primary-hover active:primary-active)\n  ";

var text = "\n    border-none\n    bg(initial hover:gray-100 focus:gray-100 active:gray-200)\n    disabled:bg(initial hover:initial focus:initial active:initial)\n  ";

var link = "\n    border-none\n    text(link hover:link-hover focus:link-hover active:link-active)\n    bg(initial hover:initial focus:initial active:initial)\n    disabled:bg(initial hover:initial focus:initial active:initial)\n  ";

var dashed = def + " border-dashed";

var danger = "danger hover:danger-hover focus:danger-hover active:danger-active";

function make(size, _type, isDanger, block, isDisabled) {
  var classes = [init];
  if (isDisabled) {
    classes.push(disabled);
  }
  var colors = _type === "text" ? (
      isDanger ? [
          text,
          "text(" + danger + ")"
        ] : [text]
    ) : (
      _type === "primary" ? (
          isDanger ? [
              primary,
              "bg(" + danger + ")",
              "border(" + danger + ")"
            ] : [primary]
        ) : (
          _type === "default" ? (
              isDanger ? [
                  "text(" + danger + ")",
                  "border(" + danger + ")"
                ] : [def]
            ) : (
              _type === "dashed" ? (
                  isDanger ? [
                      dashed,
                      "text(" + danger + ")",
                      "border(" + danger + ")"
                    ] : [
                      dashed,
                      "border-dashed"
                    ]
                ) : (
                  isDanger ? [
                      link,
                      "text(" + danger + ")"
                    ] : [link]
                )
            )
        )
    );
  classes = classes.concat(colors);
  if (block) {
    classes.push("w-full");
  }
  if (size === "small") {
    classes.push("h-6 py-0");
  } else if (size === "default") {
    classes.push("h-8 py-[4px]");
  } else {
    classes.push("text-lg h-10 py-[7px]");
  }
  return Twind.tw(Twind.apply(classes));
}

var Style = {
  init: init,
  disabled: disabled,
  def: def,
  primary: primary,
  text: text,
  link: link,
  dashed: dashed,
  danger: danger,
  make: make
};

var make$1 = React.forwardRef(function (Props, ref_) {
      var style = Props.style;
      var _typeOpt = Props.type;
      var size = Props.size;
      var dangerOpt = Props.danger;
      var blockOpt = Props.block;
      var disabledOpt = Props.disabled;
      var children = Props.children;
      var _type = _typeOpt !== undefined ? _typeOpt : "default";
      var danger = dangerOpt !== undefined ? dangerOpt : false;
      var block = blockOpt !== undefined ? blockOpt : false;
      var disabled = disabledOpt !== undefined ? disabledOpt : false;
      var context = React.useContext(MxRC__ConfigProvider.ConfigContext.ctx);
      var size$1 = Belt_Option.getWithDefault(size, context.size);
      var className = make(size$1, _type, danger, block, disabled);
      var tmp = {
        className: className,
        style: style
      };
      var tmp$1 = Belt_Option.map((ref_ == null) ? undefined : Caml_option.some(ref_), (function (prim) {
              return prim;
            }));
      if (tmp$1 !== undefined) {
        tmp.ref = Caml_option.valFromOption(tmp$1);
      }
      return React.createElement("button", tmp, children);
    });

export {
  Style ,
  make$1 as make,
  
}
/* make Not a pure module */
