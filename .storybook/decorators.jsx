import { ConfigProvider } from '@components';

ConfigProvider.setup({});

export const decorators = [
  (Story) => (
    <ConfigProvider>
      <Story />
    </ConfigProvider>
  )
]