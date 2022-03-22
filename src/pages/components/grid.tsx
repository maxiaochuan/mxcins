// import * as React from 'react';
import { Row, Col } from '@mxcins/components';
import { Record } from '../../components';

const GridView = () => {
  return (
    <>
      <Record title="row" style={{ display: 'block' }}>
        <Row
          style={{ width: '100%' }}
          dynamicSpace={[
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
        <Row space={[20, 0]}>
          <Col flex="200px">
            <div style={{ width: '100%', height: 50, background: 'red', color: 'white' }}>
              200px
            </div>
          </Col>
          <Col flex="auto">
            <div style={{ width: '100%', height: 50, background: 'blue', color: 'white' }}>
              auto
            </div>
          </Col>
        </Row>
      </Record>
    </>
  );
};

export default GridView;
