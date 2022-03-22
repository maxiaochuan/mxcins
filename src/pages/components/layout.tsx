import * as React from 'react';
import { Layout } from '@mxcins/components';
import { Record } from '../../components';
import { tw } from 'twind';
import { css } from 'twind/css';

const { Sider, Header, Footer, Content } = Layout;

const classes = css({
  header: {
    color: 'white',
    background: '#7dbcea',
  },
  footer: {
    color: 'white',
    background: '#7dbcea',
  },
  aside: {
    color: 'white',
    lineHeight: '120px',
    background: '#3ba0e9',
  },
  main: {
    color: 'white',
    textAlign: 'center',
    height: '120px',
    lineHeight: '120px',
    background: 'rgba(16, 142, 233, 1)',
  },
});

const LayoutView = () => {
  return (
    <>
      <Record title="vertical" className={tw(classes)}>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>

        <Layout>
          <Header>Header</Header>
          <Layout>
            <Sider>Sider</Sider>
            <Content>Content</Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>

        <Layout>
          <Header>Header</Header>
          <Layout>
            <Content>Content</Content>
            <Sider>Sider</Sider>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>

        <Layout>
          <Sider>Sider</Sider>
          <Layout>
            <Header>Header</Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </Record>
    </>
  );
};

export default LayoutView;
