import { Button } from './_components';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'components/button',
  component: Button,
} as ComponentMeta<typeof Button>

const T: ComponentStory<typeof Button> = args => <Button {...args} />;

export const primary = T.bind({});

primary.args = {
  type: "primary",
  children: "primary",
}
