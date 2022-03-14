import * as React from 'react';
import { Row } from '@mxcins/components';
import { Record } from '../../components';

const GridView = () => {
  return (
    <>
      <Record title="row">
        <Row gap={[20, { xs: 2, md: 20 }]}>
          <div style={{ width: 50, height: 50, background: 'gray' }}></div>
          <div style={{ width: 50, height: 50, background: 'red' }}></div>
          <div style={{ width: 50, height: 50, background: 'green' }}></div>
          <div style={{ width: 50, height: 50, background: 'blue' }}></div>
        </Row>
      </Record>
    </>
  );
};

export default GridView;
