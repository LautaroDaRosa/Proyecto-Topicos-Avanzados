import Feed from '../Feed';
import StHome from './StHome';
import Sidebar from '../../components/Sidebar';
import { UserList } from '../UserList';
import Title from '../../components/Title';
import Navbar from '../../components/NavBar';
import PageContainer from 'app/components/PageContainer';
import Ball from 'app/components/Ball';

const Home = () => (
  <StHome>
    <Navbar />
    <PageContainer>
      <Sidebar placement="left">
        <UserList />
      </Sidebar>
      <Feed />
      <Sidebar placement="right">
        <Title text="Coming soon" />
        <p>We are currently working on amazing features.</p>
        <p>Stay tuned!</p>
      </Sidebar>
    </PageContainer>
    <Ball width={76} height={80} color="white" type="home-ball" />
  </StHome>
);
export default Home;
