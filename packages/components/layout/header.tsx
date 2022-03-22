import styled from 'styled-components';

const Header = styled.header`
  height: ${({ theme }) => theme['layout-header-height']};
  padding: ${({ theme }) => theme['layout-header-padding']};
  color: ${({ theme }) => theme['layout-header-color']};
  line-height: ${({ theme }) => theme['layout-header-height']};
  background: ${({ theme }) => theme['layout-header-background-color']};
`;

export default Header;
