import styled from 'styled-components';

const Footer = styled.footer`
  padding: ${({ theme }) => theme['layout-footer-padding']};
  color: ${({ theme }) => theme['layout-footer-color']};
  font-size: 14px;
  background: ${({ theme }) => theme['layout-footer-background-color']};
`;

export default Footer;
