/* eslint-disable global-require, import/no-dynamic-require */
import Loadable from 'react-loadable';
import _umiDynamic from 'umi/dynamic';
import { types } from 'mobx-state-tree';

const cached: { [x:string]: any } = {};

function registerStore(stores: any[] = []) {
  stores.map((store: any) => {
    const { name, instance } = store;
    if (!cached[name]) {
      types.model('RootStore', {
        [name]: types.optional(instance, {}),
      });
      cached[name] = 1;
    }
  });
}

export default function dynamic(config: any) {
  const { stores, component, loading } = config;
  return Loadable({ loader: () => component(), loading });
  // return _umiDynamic({ loader: () => component() });
  // return _umiDynamic({
  //   modules: stores.map((store: any) => store.then())
  //   // async loader() {
  //   //   if(storeImports) {
  //   //     const stores: any[] = await Promise.all(storeImports);
  //   //     registerStore(stores);
  //   //   }
  //   //   return component();
  //   // },
  //   loading,
  // });
}
