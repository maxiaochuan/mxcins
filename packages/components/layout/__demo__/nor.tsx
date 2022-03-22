/**
 * title: 基本结构
 */
/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components';
import { Layout } from '@mxcins/components';

const { Header, Content, Footer, Sider } = Layout;

const C = styled.div`
  & > section {
    margin-bottom: 12px;
    & > * {
      text-align: center;
    }
    main,
    header,
    footer,
    aside {
      color: white;
    }

    header,
    footer {
      background: #7dbcea;
    }

    aside {
      line-height: 120px;
      background: #3ba0ed;
    }

    main {
      min-height: 120px;
      line-height: 120px;
      background: rgba(16, 142, 233, 1);
    }
  }
`;

export default (): React.ReactElement => (
  <C>
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
  </C>
);
