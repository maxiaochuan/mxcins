// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "rescript/lib/es6/curry.js";
import * as React from "react";
import * as Js_math from "rescript/lib/es6/js_math.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";
import * as MxLibs__SingleResizeObserver from "@mxcins/libs/src/MxLibs__SingleResizeObserver.js";

function useObserveResize(target, onResize, disabled) {
  var sizeRef = React.useRef({
        width: -1,
        height: -1,
        offsetWidth: -1,
        offsetHeight: -1
      });
  var onResizeRef = React.useRef(onResize);
  var onObserverResizeCallback = React.useCallback(function (entry) {
        var target = entry.target;
        var rect = target.getBoundingClientRect();
        var width = rect.width;
        var height = rect.height;
        var offsetWidth = target.offsetWidth;
        var offsetHeight = target.offsetHeight;
        var fixedWidth = Js_math.floor_int(width);
        var fixedHeight = Js_math.floor_int(height);
        if (!(sizeRef.current.width !== fixedWidth || sizeRef.current.height !== fixedHeight || sizeRef.current.offsetWidth !== offsetWidth || sizeRef.current.offsetHeight !== offsetHeight)) {
          return ;
        }
        var size = {
          width: fixedWidth,
          height: fixedHeight,
          offsetWidth: offsetWidth,
          offsetHeight: offsetHeight
        };
        sizeRef.current = size;
        var onResizeCallback = onResizeRef.current;
        if (onResizeCallback !== undefined) {
          Promise.resolve(undefined).then(function (param) {
                Curry._2(onResizeCallback, target, size);
                return Promise.resolve(undefined);
              });
          return ;
        }
        
      });
  React.useEffect((function () {
          if (target !== undefined) {
            var target$1 = Caml_option.valFromOption(target);
            if (disabled !== undefined && disabled) {
              
            } else {
              MxLibs__SingleResizeObserver.observe(target$1, onObserverResizeCallback);
            }
          }
          return (function (param) {
                    if (target !== undefined) {
                      return MxLibs__SingleResizeObserver.unobserve(Caml_option.valFromOption(target), onObserverResizeCallback);
                    }
                    
                  });
        }), [
        target,
        disabled
      ]);
  
}

export {
  useObserveResize ,
  
}
/* react Not a pure module */