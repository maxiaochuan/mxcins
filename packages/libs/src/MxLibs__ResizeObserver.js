// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_option from "../../../node_modules/rescript/lib/es6/js_option.js";
import * as Caml_option from "../../../node_modules/rescript/lib/es6/caml_option.js";
import ResizeObserverPolyfill from "../../../node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js";

var $$ResizeObserverEntry = {};

var $$ResizeObserver = {};

var map = new Map();

var observer = new ResizeObserverPolyfill((function (entries) {
        entries.forEach(function (entry) {
              var target = entry.target;
              Js_option.getExn(map.get(target)).forEach(function (callback) {
                    return Curry._1(callback, entry);
                  });
              
            });
        
      }));

function observe(element, callback) {
  var set = map.get(element);
  if (set !== undefined) {
    Caml_option.valFromOption(set).add(callback);
    return ;
  }
  observer.observe(element);
  var set$1 = new Set().add(callback);
  map.set(element, set$1);
  
}

function unobserve(element, callback) {
  var set = map.get(element);
  if (set === undefined) {
    return ;
  }
  var set$1 = Caml_option.valFromOption(set);
  set$1.delete(callback);
  if (set$1.size === 0) {
    observer.unobserve(element);
    return ;
  }
  
}

export {
  $$ResizeObserverEntry ,
  $$ResizeObserver ,
  observe ,
  unobserve ,
  
}
/* map Not a pure module */
