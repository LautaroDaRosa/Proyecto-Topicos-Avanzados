import StHome from './StHome';
import Title from '../../components/Title';
import Navbar from '../../components/NavBar';
import PageContainer from 'app/components/PageContainer';
import Button from 'app/components/Button';
import StMainMessageContainer from './StMainMessageContainer';
import CreateFormModal from 'app/components/Modals/CreateFormModal';
import { useState } from 'react';
import currentUser from 'utils/currentUser';

const Home = () => {
  const user = currentUser.get();
  const existsForm = false;
  const [isModalOpenned, setIsModalOpenned] = useState(false);
  return (
    <StHome>
      <Navbar />
      <PageContainer>
        <div style={{ flex: 1, margin: 32, marginTop: 0 }}>
          <Title text="Bienvenido a la aplicacion de DERES!" />
          <CreateFormModal
            isOpenned={isModalOpenned}
            setIsOpenned={setIsModalOpenned}
          />
          <StMainMessageContainer>
            {user.role === 'ADMIN' && !existsForm && (
              <>
                <span>Aún no existe ningún formulario</span>
                <Button
                  action="link"
                  text="Puedes crear uno aquí"
                  onClick={() => setIsModalOpenned(true)}
                />
              </>
            )}
            {user.role === 'ADMIN' && existsForm && (
              <>
                <span>Hemos encontrado 1 formulario previamente creado</span>
                <Button
                  action="link"
                  text="Puedes editar su información aquí"
                  onClick={() => alert('Salta modal')}
                />
              </>
            )}
          </StMainMessageContainer>
        </div>
      </PageContainer>
    </StHome>
  );
};
export default Home;
