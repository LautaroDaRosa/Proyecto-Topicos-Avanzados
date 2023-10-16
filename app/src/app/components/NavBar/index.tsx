/**
 *
 * Navbar
 *
 */

import { Link, useLocation } from 'react-router-dom';

import selectedHome from '../../../resources/home-selected.svg';
import home from '../../../resources/home.svg';
import buildings from '../../../resources/buildings.svg';
import selectedBuildings from '../../../resources/buildings-selected.svg';
import logo from '../../../resources/logo-min.png';
import Header from './Header';
import Nav from './Nav';
import StBrand from './StBrand';
import StLine from './StLine';
import StNavOption from './StNavOption';

const Navbar = () => {
  const pathname = useLocation().pathname;
  return (
    <Header>
      <img
        src={logo}
        alt="logo"
        style={{
          width: '60px',
          height: '60px',
          marginLeft: '24px',
          marginRight: '24px',
        }}
      />
      <StBrand>Empresas por el desarrollo sostenible</StBrand>
      <StLine />
      <Nav>
        <Link to="/">
          <StNavOption isSelected={pathname === '/'}>
            <img src={pathname === '/' ? selectedHome : home} alt="Home icon" />
            <span>Inicio</span>
          </StNavOption>
        </Link>
        <Link to="/providers">
          <StNavOption isSelected={pathname === '/providers'}>
            <img
              src={pathname === '/providers' ? selectedBuildings : buildings}
              alt="Home icon"
            />
            <span>Proveedores</span>
          </StNavOption>
        </Link>
      </Nav>
    </Header>
  );
};

export default Navbar;