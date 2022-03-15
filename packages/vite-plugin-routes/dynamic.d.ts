import type { FC, ComponentType } from 'react';

export default <T extends ComponentType<any>>(factory: () => { default: T }, opts: { isLayout?: boolean } = {}) => FC