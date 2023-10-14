import styled from 'styled-components';

const Nav = styled.nav`
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding-left: 40px;

  @media (max-width: 1279px) {
    position: fixed;
    bottom: 0px;
    width: 100%;
    background: white;
    height: 72px;
    align-items: center;
    justify-content: center;
  }

  a {
    text-decoration: none;
    color: #1c1a46;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: capitalize;
  }
`;

export default Nav;
