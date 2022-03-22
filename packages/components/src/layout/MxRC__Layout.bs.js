// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Twind from "twind";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";

var ctx = React.createContext({
      sider: {
        add: (function (param) {
            
          }),
        remove: (function (param) {
            
          })
      }
    });

function make(add, remove) {
  return {
          sider: {
            add: add,
            remove: remove
          }
        };
}

var provider = ctx.Provider;

function MxRC__Layout$LayoutContext$Provider(Props) {
  var value = Props.value;
  var children = Props.children;
  return React.createElement(provider, {
              value: value,
              children: children
            });
}

var Provider = {
  provider: provider,
  make: MxRC__Layout$LayoutContext$Provider
};

var LayoutContext = {
  ctx: ctx,
  make: make,
  Provider: Provider
};

var init = "flex flex-auto bg-background min-h-0";

function make$1(className, hasSider) {
  var classes = [init];
  classes.push(hasSider ? "flex-row" : "flex-col");
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

var LayoutTwind = {
  init: init,
  make: make$1
};

function MxRC__Layout(Props) {
  var className = Props.className;
  var style = Props.style;
  var hasSider = Props.hasSider;
  var children = Props.children;
  var match = React.useState(function () {
        return [];
      });
  var setSiders = match[1];
  var value = React.useMemo((function () {
          return {
                  sider: {
                    add: (function (id) {
                        return Curry._1(setSiders, (function (prev) {
                                      return [].concat(prev).concat([id]);
                                    }));
                      }),
                    remove: (function (id) {
                        return Curry._1(setSiders, (function (prev) {
                                      return prev.filter(function (previd) {
                                                  return previd !== id;
                                                });
                                    }));
                      })
                  }
                };
        }), []);
  var hasSider$1 = Belt_Option.getWithDefault(hasSider, false) || match[0].length > 0;
  var className$1 = make$1(className, hasSider$1);
  var children$1 = Belt_Option.getWithDefault(children, null);
  var tmp = {
    className: className$1
  };
  if (style !== undefined) {
    tmp.style = Caml_option.valFromOption(style);
  }
  return React.createElement(MxRC__Layout$LayoutContext$Provider, {
              value: value,
              children: React.createElement("section", tmp, children$1)
            });
}

var make$2 = MxRC__Layout;

export {
  LayoutContext ,
  LayoutTwind ,
  make$2 as make,
  
}
/* ctx Not a pure module */
