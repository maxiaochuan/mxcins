/**
 * title: Sider
 */
/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components';
import { Layout } from '@mxcins/components';
import { useEffect, useState } from 'react';

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

export default (): React.ReactElement => {
  const [c, set] = useState(false);
  useEffect(() => {
    const id = window.setInterval(() => set(prev => !prev), 5000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <C>
      <Layout>
        <Sider collapsed={c}>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </C>
  );
};
