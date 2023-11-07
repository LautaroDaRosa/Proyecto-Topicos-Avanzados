import StHome from './StHome';
import Title from '../../components/Title';
import Navbar from '../../components/NavBar';
import PageContainer from 'app/components/PageContainer';
import Button from 'app/components/Button';
import StMainMessageContainer from './StMainMessageContainer';
import CreateFormModal from 'app/components/Modals/CreateFormModal';
import { useEffect, useState } from 'react';
import currentUser from 'utils/currentUser';
import { getQuestions } from 'store/form/api';
import { QuestionWithId } from 'types';
import EditFormModal from 'app/components/Modals/EditFormModal';

const Home = () => {
  const user = currentUser.get();
  const [questions, setQuestions] = useState<QuestionWithId[]>([]);

  useEffect(() => {
    async function fetchQuestions() {
      if (user.role === 'ADMIN') {
        const response = await getQuestions();
        setQuestions(response);
        console.log(response);
      }
    }
    fetchQuestions();
  }, [user.role]);
  // questions.filter(question => question.categoryQuestion === 'ENVIRONMENTAL')
  const [isCreateModalOpenned, setIsCreateModalOpenned] = useState(false);
  const [isEditModalOpenned, setIsEditModalOpenned] = useState(false);
  return (
    <StHome>
      <Navbar />
      <PageContainer>
        <div style={{ flex: 1, margin: 32, marginTop: 0 }}>
          <Title text="Bienvenido a la aplicacion de DERES!" />
          <CreateFormModal
            isOpenned={isCreateModalOpenned}
            setIsOpenned={setIsCreateModalOpenned}
          />
          <EditFormModal
            isOpenned={isEditModalOpenned}
            setIsOpenned={setIsEditModalOpenned}
            sQuestions={questions.filter(
              question => question.categoryQuestion === 'SOCIAL',
            )}
            eQuestions={questions.filter(
              question => question.categoryQuestion === 'ENVIRONMENTAL',
            )}
            gQuestions={questions.filter(
              question => question.categoryQuestion === 'GOVERNANCE',
            )}
          />
          <StMainMessageContainer>
            {user.role === 'ADMIN' && questions.length === 0 && (
              <>
                <span>Aún no existe ningún formulario</span>
                <Button
                  action="link"
                  text="Puedes crear uno aquí"
                  onClick={() => setIsCreateModalOpenned(true)}
                />
              </>
            )}
            {user.role === 'ADMIN' && questions.length > 0 && (
              <>
                <span>Hemos encontrado 1 formulario previamente creado</span>
                <Button
                  action="link"
                  text="Puedes editar su información aquí"
                  onClick={() => setIsEditModalOpenned(true)}
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
