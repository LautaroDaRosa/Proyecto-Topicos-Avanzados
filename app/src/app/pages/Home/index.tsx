import StHome from './StHome';
import Sidebar from '../../components/Sidebar';
import Title from '../../components/Title';
import Navbar from '../../components/NavBar';
import PageContainer from 'app/components/PageContainer';

const Home = () => (
  <StHome>
    <Navbar />
    <PageContainer>
      <div style={{ flex: 1, margin: 32, marginTop: 0 }}>
        <Title text="Bienvenido a la aplicacion de DERES!" />
      </div>
      <Sidebar placement="right">
        <Title text="Muy pronto..." />
        <p>Estamos trabajando en nuevas features.</p>
        <p>Mantenete al tanto!</p>
      </Sidebar>
    </PageContainer>
  </StHome>
);
export default Home;
