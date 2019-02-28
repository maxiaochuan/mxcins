import { types, addMiddleware } from "mobx-state-tree";
import makeInspectable from 'mobx-devtools-mst';

const runtimeMobx = window.g_plugins.mergeConfig('mobx');
let config = { <%= MobxConfigure %> } || {};

config = {...config,...(runtimeMobx.config || {})};

const RootStore = types.model("RootStore", { <%= RegisterStores %> })

const mobx_stores = RootStore.create(config.initStores || {});

addMiddleware(mobx_stores, (call, next, abort) => {
  if (call.type === 'flow_throw') {
    try {
      config.onError(call.args[0]);
      abort();
    } catch (e) {
      next(call);
    }
  } else {
    next(call);
  }
});

if(config.mstTools)
makeInspectable(mobx_stores);

window.mobx_app = {
  mobx_stores,
  devTools:config.devTools || false
}
