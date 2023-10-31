import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStatus as loginStatusSelector } from 'store/auth/selectors';
import { AuthSlice } from 'store/auth/slice';
import { API_STATUS } from 'utils/constants';
import DeresBackground from '../../../resources/deres-background2.png';
import DeresLogo from '../../../resources/deres-logo.png';
import Button from '../../components/Button';
import Form from './Form';
import StBackgroundImage from './StBackgroundImage';
import StLogin from './StLogin';
import tokenService from 'utils/tokenService';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const loginStatus = useSelector(loginStatusSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = AuthSlice();

  useEffect(() => {
    if (
      loginStatus === API_STATUS.success ||
      tokenService.getLocalAccessToken()
    ) {
      navigate('/');
    }
  }, [loginStatus, navigate]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(actions.login({ username: user, password: password }));
  };

  return (
    <StLogin>
      <Form onSubmit={handleSubmit}>
        <img src={DeresLogo} alt="DERES Logo" />
        <div>
          <h1>Inicia sesión en DERES</h1>
          <label>
            Usuario
            <input type="text" onChange={e => setUser(e.target.value)} />
          </label>
          <label>
            Contraseña
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          {}
          <Button
            type="submit"
            action="primary"
            text="Ingresar"
            disabled={user === '' || password === ''}
          />
        </div>
      </Form>
      <StBackgroundImage src={DeresBackground} alt="DERES background" />
    </StLogin>
  );
};

export default Login;
