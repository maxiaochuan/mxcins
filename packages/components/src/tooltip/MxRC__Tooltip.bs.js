// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Nanoid from "nanoid";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as MxWebapi__Dom from "@mxcins/webapi/src/dom/MxWebapi__Dom.bs.js";
import * as MxRC__Libs__React from "../_libs/MxRC__Libs__React.bs.js";
import * as MxRC__ConfigProvider from "../config-provider/MxRC__ConfigProvider.bs.js";

function MxRC__Tooltip$ToolipContent(Props) {
  var id = Props.id;
  var content = Props.content;
  var target = Props.target;
  var divRef = React.useRef(null);
  React.useEffect((function () {
          var match = divRef.current;
          if (!(match == null) && !(target == null)) {
            console.log("render", match, target);
            MxWebapi__Dom.DomMover.align(match, target, [
                  "cc",
                  "cc"
                ], undefined, undefined, undefined);
          }
          
        }), [target]);
  return React.createElement("div", {
              id: id
            }, React.createElement("div", {
                  ref: divRef,
                  style: {
                    position: "absolute"
                  }
                }, content));
}

var ToolipContent = {
  make: MxRC__Tooltip$ToolipContent
};

function MxRC__Tooltip(Props) {
  var title = Props.title;
  var children = Props.children;
  var idRef = React.useRef(Nanoid.nanoid());
  var match = React.useState(function () {
        return null;
      });
  var getContainer = MxRC__ConfigProvider.ConfigContext.getPartalContainer;
  var partal = React.createElement(MxRC__Libs__React.Partal.make, {
        getContainer: getContainer,
        children: React.createElement(MxRC__Tooltip$ToolipContent, {
              id: idRef.current,
              content: Belt_Option.getWithDefault(title, ""),
              target: match[0]
            })
      });
  var children$1 = React.cloneElement(children, {
        ref: match[1]
      });
  return React.createElement(React.Fragment, undefined, partal, children$1);
}

var make = MxRC__Tooltip;

export {
  ToolipContent ,
  make ,
  
}
/* react Not a pure module */