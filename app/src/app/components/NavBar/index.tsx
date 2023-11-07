import { Link, useLocation, useNavigate } from 'react-router-dom';

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
import Button from '../Button';
import tokenService from 'utils/tokenService';
import { useDispatch } from 'react-redux';
import { AuthSlice } from 'store/auth/slice';
import StBrandAndLinks from './StBrandAndLinks';
import StUserActionsContainer from './StUserActionsContainer';
import StAvatar from './StAvatar';
import AvatarButton from './StAvatarButton';
import currentUser from 'utils/currentUser';

const Navbar = () => {
  const user = currentUser.get();
  const pathname = useLocation().pathname;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { actions } = AuthSlice();

  const logout = () => {
    tokenService.removeLocalTokens();
    currentUser.remove();
    dispatch(actions.logout());
    navigate('/login');
  };

  const goToMyProfile = () => {
    dispatch(actions.logout());
    navigate('/profile');
  };

  return (
    <Header>
      <StBrandAndLinks>
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
              <img
                src={pathname === '/' ? selectedHome : home}
                alt="Home icon"
              />
              <span>Inicio</span>
            </StNavOption>
          </Link>
          {user.role !== 'PROVIDER' && (
            <Link to="/providers">
              <StNavOption isSelected={pathname === '/providers'}>
                <img
                  src={
                    pathname === '/providers' ? selectedBuildings : buildings
                  }
                  alt="Home icon"
                />
                <span>Proveedores</span>
              </StNavOption>
            </Link>
          )}
        </Nav>
      </StBrandAndLinks>
      <StUserActionsContainer>
        <StAvatar>
          <AvatarButton onClick={goToMyProfile} />
        </StAvatar>
        <Button
          text="Cerrar sesión"
          type="submit"
          action="primary"
          onClick={logout}
        />
      </StUserActionsContainer>
    </Header>
  );
};

export default Navbar;
