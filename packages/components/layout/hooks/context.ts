import { createContext } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const LayoutContext = createContext<{
  sider: { add: (id: string) => void; remove: (id: string) => void };
}>({ sider: { add: () => {}, remove: () => {} } });
