/**
 *
 * Navbar
 *
 */

import { Link, useLocation } from 'react-router-dom';

import logo from '../../../resources/logo.png';
import home from '../../../resources/home.svg';
import selectedHome from '../../../resources/home-selected.svg';
import gallery from '../../../resources/gallery.svg';
import selectedGallery from '../../../resources/gallery-selected.svg';
import Header from './Header';
import Nav from './Nav';
import StLine from './StLine';
import StNavOption from './StNavOption';
import StBrand from './StBrand';

const Navbar = () => {
  const pathname = useLocation().pathname;
  return (
    <Header>
      <img src={logo} alt="logo" />
      <StBrand>Octobot Community</StBrand>
      <StLine />
      <Nav>
        <Link to="/">
          <StNavOption isSelected={pathname === '/'}>
            <img src={pathname === '/' ? selectedHome : home} alt="Home icon" />
            <span>Home</span>
          </StNavOption>
        </Link>
        <Link to="/gallery">
          <StNavOption isSelected={pathname === '/gallery'}>
            <img
              src={pathname === '/gallery' ? selectedGallery : gallery}
              alt="Gallery icon"
            />
            <span>Gallery</span>
          </StNavOption>
        </Link>
      </Nav>
    </Header>
  );
};

export default Navbar;
