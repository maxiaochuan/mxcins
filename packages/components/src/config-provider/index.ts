import { Configuration } from 'twind';
import { make, setup } from './MxRC__ConfigProvider.gen';
import type { Props as ConfigProviderProps } from './MxRC__ConfigProvider.gen';

type ConfigProviderType = typeof make & { setup: (conf?: Configuration) => void };

const ConfigProvider: ConfigProviderType = make as ConfigProviderType;
ConfigProvider.setup = setup;

export { ConfigProvider };
export type { ConfigProviderProps };
