// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Twind from "twind";
import * as Css from "twind/css";
import * as MxRC__Libs__Twind from "../_libs/MxRC__Libs__Twind.bs.js";

function makeNoStyle(param) {
  return MxRC__Libs__Twind.atw(undefined, ["w-full p-0 m-0"]);
}

function make($$class, size, z, affix, focused) {
  var classes = ["\n    inline-block\n    relative\n    m-0\n    min-w-0\n    w-full\n    overflow-visible\n    text(sm text)\n    border(1 solid border)\n    hover:(border-primary-hover)\n    focus:(border-primary-hover shadow-input-focus)\n    transition\n    tabular-nums\n    rounded\n  "];
  if (affix) {
    classes.push("inline-flex");
  }
  if (focused) {
    classes.push("border-primary-hover shadow-input-focus");
  }
  classes.push(size === "small" ? "h-6 px-2-bordered" : (
          size === "default" ? "h-8 px-3-bordered" : "h-10 px-3-bordered text-base"
        ));
  if (z) {
    classes.push("z-1");
  }
  return MxRC__Libs__Twind.atw($$class, classes);
}

function makeTextArea($$class, size, focused) {
  var $$class$1 = make($$class, size, false, false, focused);
  var classes = ["h-auto"];
  classes.push(size === "small" ? "py-y6-bordered" : (
          size === "default" ? "py-y8-bordered" : "py-y10-bordered"
        ));
  return MxRC__Libs__Twind.atw($$class$1, classes);
}

function makeFixed(pos) {
  var classes = ["flex flex-none items-center"];
  classes.push(pos === "prefix" ? "mr-1" : "ml-1");
  return MxRC__Libs__Twind.atw(undefined, classes);
}

function makeGroup(param) {
  var out = MxRC__Libs__Twind.atw(undefined, ["inline-block w-full"]);
  var classes = [
    "table w-full m-0 p-0 tabular-nums",
    Css.css({
          "& > *:first-child": Twind.apply(["rounded-l"]),
          "& > *:last-child": Twind.apply(["rounded-r"]),
          "& > *:not(:first-child)": Twind.apply(["rounded-l-none"]),
          "& > *:not(:last-child)": Twind.apply(["rounded-r-none"]),
          "& > *": Twind.apply(["align-middle"])
        })
  ];
  var inner = MxRC__Libs__Twind.atw(undefined, classes);
  return [
          out,
          inner
        ];
}

function makeAddon(noStyled) {
  var classes = [
    "relative w-0 table-cell font-normal transition",
    noStyled ? "-left-px" : "px-3-bordered text(sm center text) bg(background) border(1 border)",
    Css.css({
          "&:first-child": Twind.apply(["border-r-0"]),
          "&:last-child": Twind.apply(["border-l-0"])
        })
  ];
  return MxRC__Libs__Twind.atw(undefined, classes);
}

function makeClear(param) {
  return MxRC__Libs__Twind.atw(undefined, [
              "\n    text-text-disabled\n    pointer\n    text-xs\n    hover:(text-text-secondary)\n    active:(text-text)\n    transition\n    ",
              Css.css({
                    "vertical-align": "-1px"
                  })
            ]);
}

export {
  makeNoStyle ,
  make ,
  makeTextArea ,
  makeFixed ,
  makeGroup ,
  makeAddon ,
  makeClear ,
  
}
/* twind Not a pure module */
