import * as React from 'react';
import { Divider } from '@mxcins/components';
import { Record } from '../../components';

const DividerView = () => {
  return (
    <>
      <Record title="vertical">
        <div>
          <span>Text</span>
          <Divider type="vertical" />
          <a href="#">Link</a>
          <Divider type="vertical" />
          <a href="#">Link</a>
        </div>
      </Record>
      <Record>
        <p> Lorem ipsum dolor sit amet </p>
        <Divider />
        <Divider dashed />
        <Divider orientation="left">Text</Divider>
        <Divider orientation="center">Text</Divider>
        <Divider orientation="right">Text</Divider>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
          ista probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
        <Divider dashed />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi
          ista probare, quae sunt a te dicta? Refert tamen, quo modo.
        </p>
      </Record>
    </>
  );
};

export default DividerView;