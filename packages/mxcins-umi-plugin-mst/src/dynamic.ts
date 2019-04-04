/* eslint-disable global-require, import/no-dynamic-require */
import { types } from 'mobx-state-tree';
import { dynamic as _umiDynamic } from 'umi';

const cached: { [x: string]: any } = {};

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
  const { stores: resolveStores = () => [], component: resolveComponent, loading } = config;
  return _umiDynamic({
    async loader() {
      const stores = resolveStores();
      const instances: any[] = await Promise.all(stores);
      registerStore(instances);
      return resolveComponent();
    },
    loading,
  });
}
