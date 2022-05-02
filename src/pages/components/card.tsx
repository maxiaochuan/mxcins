import * as React from 'react';
import { Space, Button, Card } from '@mxcins/components';
import { Record } from '../../components';

const CardView = () => {
  return (
    <>
      <Record title="Card">
        <div style={{ display: 'flex', gap: 12, alignItems: 'start', flexWrap: 'wrap' }}>
        <Card title="title" style={{ width: 300 }}>
          <div>content</div>
          <div>content</div>
          <div>content</div>
        </Card>
        <Card title="title" style={{ width: 300 }} extra={<a href="#">Edit</a>}>
          <div>content</div>
          <div>content</div>
          <div>content</div>
        </Card>
        <Card size="small" title="title" style={{ width: 300 }} extra={<a href="#">Edit</a>}>
          <div>content</div>
          <div>content</div>
          <div>content</div>
        </Card>
        <Card size="small" title="title" style={{ width: 300 }} bordered={false}>
          <div>content</div>
          <div>content</div>
          <div>content</div>
        </Card>
        <Card
          // hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
          {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
        </Card>
        </div>
      </Record>
    </>
  );
};

export default CardView;
