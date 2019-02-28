/* eslint-disable global-require */
import React from 'react';

export function rootContainer(container: any) {
  const MobxContainer = require('@tmp/MobxContainer').default;
  return React.createElement(MobxContainer, null, container);
}
