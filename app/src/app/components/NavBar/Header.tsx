import styled from 'styled-components';

const Header = styled.header`
  height: 72px;
  background-color: white;
  box-shadow: 0px 0px 20px 0px lightgrey;
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 9;

  img {
    height: 100%;
  }
`;

export default Header;
