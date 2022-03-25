// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Twind from "twind";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as MxRC__Libs__Twind from "../_libs/MxRC__Libs__Twind.bs.js";

var ctx = React.createContext({
      size: "default"
    });

var provider = ctx.Provider;

function MxRC__ConfigProvider$ConfigContext$Provider(Props) {
  var value = Props.value;
  var children = Props.children;
  return React.createElement(provider, {
              value: value,
              children: children
            });
}

var Provider = {
  provider: provider,
  make: MxRC__ConfigProvider$ConfigContext$Provider
};

var ConfigContext = {
  ctx: ctx,
  Provider: Provider
};

function setup(param) {
  Twind.setup(MxRC__Libs__Twind.conf);
  
}

function MxRC__ConfigProvider(Props) {
  var sizeOpt = Props.size;
  var childrenOpt = Props.children;
  var size = sizeOpt !== undefined ? sizeOpt : "default";
  var children = childrenOpt !== undefined ? Caml_option.valFromOption(childrenOpt) : null;
  var value = React.useMemo((function () {
          return {
                  size: size
                };
        }), [size]);
  return React.createElement(React.Fragment, undefined, React.createElement(MxRC__ConfigProvider$ConfigContext$Provider, {
                  value: value,
                  children: children
                }));
}

var make = MxRC__ConfigProvider;

export {
  ConfigContext ,
  setup ,
  make ,
  
}
/* ctx Not a pure module */
