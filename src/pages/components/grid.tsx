// import * as React from 'react';
import { Row, Col } from '@mxcins/components';
import { Record } from '../../components';

const GridView = () => {
  return (
    <>
      <Record title="row">
        <Row
          style={{ width: '100%' }}
          mspace={[
            [
              ['xs', 10],
              ['sm', 20],
            ],
            [
              ['xs', 10],
              ['sm', 20],
            ],
          ]}
        >
          <Col span={12}>
            <div style={{ width: '100%', height: 50, background: 'green' }}></div>
          </Col>
          <Col span={12}>
            <div style={{ width: '100%', height: 50, background: 'blue' }}></div>
          </Col>
          <Col span={12}>
            <div style={{ width: '100%', height: 50, background: 'gray' }}></div>
          </Col>
          <Col span={12}>
            <div style={{ width: '100%', height: 50, background: 'red' }}></div>
          </Col>
        </Row>
      </Record>
    </>
  );
};

export default GridView;
