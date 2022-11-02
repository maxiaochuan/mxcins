import { ConfigProvider } from '@mxcins/components';

ConfigProvider.setup({});

export const decorators = [
  (Story) => (
    <ConfigProvider>
      <Story />
    </ConfigProvider>
  )
]