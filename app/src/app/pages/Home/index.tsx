import StHome from './StHome';
import Title from '../../components/Title';
import Navbar from '../../components/NavBar';
import PageContainer from 'app/components/PageContainer';
import Button from 'app/components/Button';
import StMainMessageContainer from './StMainMessageContainer';
import { useCallback, useEffect, useState } from 'react';
import { getQuestions } from 'store/form/api';
import { QuestionWithId } from 'types';
import CreateFormModal from 'app/components/Modals/CreateFormModal';
import EditFormModal from 'app/components/Modals/EditFormModal';
import { isAdmin, isPartner } from 'utils/roleMapper';
import HomeContent from './HomeContent';
import SendInvite from 'app/components/SendInvite';

const Home = () => {
  const [questions, setQuestions] = useState<QuestionWithId[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestions = useCallback(async () => {
    if (isAdmin()) {
      const response = await getQuestions();
      setQuestions(response);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <StHome>
      <Navbar />
      <PageContainer>
        <div style={{ flex: 1, margin: 32, marginTop: 0 }}>
          {questions.length === 0 ? (
            <CreateFormModal
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              fetchQuestions={fetchQuestions}
            />
          ) : (
            <EditFormModal
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              fetchQuestions={fetchQuestions}
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
          )}
          <Title text="Bienvenido a la aplicacion de DERES!" />
          <div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <HomeContent>
              {isAdmin() && (
                <StMainMessageContainer>
                  {questions.length === 0 && (
                    <>
                      <span>Aún no existe ningún formulario</span>
                      <Button
                        action="link"
                        text="Puedes crear uno aquí"
                        onClick={() => setIsModalOpen(true)}
                      />
                    </>
                  )}
                  {questions.length > 0 && (
                    <>
                      <span>
                        Hemos encontrado un formulario previamente creado
                      </span>
                      <Button
                        action="link"
                        text="Puedes editar su información aquí"
                        onClick={() => setIsModalOpen(true)}
                      />
                    </>
                  )}
                </StMainMessageContainer>
              )}
              {(isAdmin() || isPartner()) && <SendInvite />}
            </HomeContent>
          </div>
        </div>
      </PageContainer>
    </StHome>
  );
};
export default Home;
