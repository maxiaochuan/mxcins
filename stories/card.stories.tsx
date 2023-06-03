import { Card } from './_components';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'components/card',
  component: Card,
} as ComponentMeta<typeof Card>;

const T: ComponentStory<typeof Card> = args => <Card {...args} />;

export const content = T.bind({});

content.args = {
  children: (
    <>
      <div>content</div>
      <div>content</div>
      <div>content</div>
    </>
  ),
};

export const title = T.bind({});

title.args = {
  ...content.args,
  title: 'title',
};

export const extra = T.bind({});

extra.args = {
  ...title.args,
  extra: <a href="#">Edit</a>,
};
