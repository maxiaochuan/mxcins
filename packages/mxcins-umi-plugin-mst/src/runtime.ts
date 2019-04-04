import React from 'react';

export function rootContainer(container: any) {
  // tslint:disable-next-line:no-implicit-dependencies
  const MobxContainer = require('@tmp/MobxContainer').default;
  return React.createElement(MobxContainer, null, container);
}
