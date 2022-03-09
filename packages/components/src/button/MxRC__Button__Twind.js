// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Twind from "twind";
import * as Css from "twind/css";
import * as Caml_splice_call from "rescript/lib/es6/caml_splice_call.js";

var init = "\n    relative\n    inline\n    font-normal\n    text(base center text)\n    whitespace-nowrap\n    border(1 gray-300)\n    rounded\n    px-3\n    transition\n  ";

var disabled = "\n    disabled:cursor-not-allowed\n    disabled:text(gray-400 hover:gray-400 focus:gray-400 active:gray-400)\n    disabled:bg(gray-100 hover:gray-100 focus:gray-100 active:gray-100)\n    disabled:border(gray-300 hover:gray-300 focus:gray-300 active:gray-300)\n  ";

var primary = "primary hover:primary-hover focus:primary-hover active:primary-active";

var danger = "danger hover:danger-hover focus:danger-hover active:danger-active";

var link = "link hover:link-hover focus:link-hover active:link-active";

var initial = "initial hover:initial focus:initial active:initial";

var transparent = "transparent hover:transparent focus:transparent active:transparent";

var def = "text(" + primary + ") text-text border(" + primary + ") border-gray-300";

var text = "\n    border-none\n    bg(initial hover:(black opacity-[0.018]) focus:(black opacity-[0.018]) active:(black opacity-[0.028]))\n    disabled:bg(initial hover:initial focus:initial active:initial)\n  ";

var block = "w-full";

var circle = "rounded-full px-0";

function make(className, size, _type, shape, isDanger, isGhost, isBlock, param, isLoading, isIconOnly) {
  var classes = [
    init,
    disabled
  ];
  var colors = _type === "text" ? (
      isDanger ? [
          text,
          "text(" + danger + ")"
        ] : [text]
    ) : (
      _type === "primary" ? (
          isDanger ? [
              "text-white",
              "bg(" + danger + ")",
              "border(" + danger + ")"
            ] : [
              "text-white",
              "bg(" + primary + ")",
              "border(" + primary + ")"
            ]
        ) : (
          _type === "default" ? (
              isDanger ? [
                  "text(" + danger + ")",
                  "border(" + danger + ")"
                ] : [def]
            ) : (
              _type === "dashed" ? (
                  isDanger ? [
                      def,
                      "border-dashed",
                      "text(" + danger + ")",
                      "border(" + danger + ")"
                    ] : [
                      def,
                      "border-dashed"
                    ]
                ) : (
                  isDanger ? [
                      "text(" + danger + ")",
                      "bg(" + initial + ")",
                      "disabled:bg(" + initial + ")",
                      "border-none"
                    ] : [
                      "text(" + link + ")",
                      "bg(" + initial + ")",
                      "disabled:bg(" + initial + ")",
                      "border-none"
                    ]
                )
            )
        )
    );
  Caml_splice_call.spliceObjApply(classes, "push", [colors]);
  if (isBlock) {
    classes.push(block);
  }
  if (isGhost) {
    if (_type === "text" || _type === "link") {
      
    } else if (_type === "primary") {
      if (isDanger) {
        classes.push("bg(" + transparent + ")", "text(" + danger + ")");
      } else {
        classes.push("bg(" + transparent + ")", "text(" + primary + ")");
      }
    } else {
      classes.push("text-white border-white");
    }
    classes.push("disabled:bg(" + transparent + ")");
  }
  if (size === "small") {
    classes.push("h-6 py-0");
  } else if (size === "default") {
    classes.push("h-8 py-[4px]");
  } else {
    classes.push("text-lg h-10 py-[7px]");
  }
  if (shape === "circle") {
    if (size === "small") {
      classes.push(circle, "min-w-6 max-w-6");
    } else if (size === "default") {
      classes.push(circle, "min-w-8 max-w-8");
    } else {
      classes.push(circle, "min-w-10 max-w-10");
    }
  } else if (shape === "round") {
    classes.push("rounded-full");
  }
  if (isIconOnly) {
    classes.push("px-0");
    if (size === "small") {
      classes.push("w-6");
    } else if (size === "default") {
      classes.push("w-8 text-lg");
    } else {
      classes.push("w-10 text-xl");
    }
  }
  classes.push("before::(content-empty inset-[-1px] z-[1] bg-white opacity-30 transition-opacity duration-200)");
  if (isLoading) {
    classes.push("cursor-default before::absolute");
  }
  var str = Css.css({
        ".anticon": Twind.apply(isIconOnly ? ["flex justify-center"] : ["animate-none pr-2"]),
        ".anticon svg": {
          animation: "loadingCircle 1s infinite linear"
        },
        span: Twind.apply(["inline-block"])
      });
  classes.push(str);
  console.log("classes", classes);
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

export {
  init ,
  disabled ,
  primary ,
  danger ,
  link ,
  initial ,
  transparent ,
  def ,
  text ,
  block ,
  circle ,
  make ,
  
}
/* twind Not a pure module */
