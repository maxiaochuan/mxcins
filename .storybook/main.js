const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@webapi': `${path.resolve(process.cwd(), 'packages', 'webapi', 'src')}`,
          '@components': `${path.resolve(process.cwd(), 'packages', 'components', 'src')}/`,
        },
      },
      define: {
        ...config.define,
        global: 'window',
      },
    };
  },
};
