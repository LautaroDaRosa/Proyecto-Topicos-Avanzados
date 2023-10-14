import Navbar from '../../components/NavBar';
import StEmployeeProfile from './StEmployeeProfile';
import Sidebar from 'app/components/Sidebar';
import { UserList } from '../UserList';
import PageContainer from 'app/components/PageContainer';
import Profile from './Profile';

const EmployeeProfile = () => {
  return (
    <StEmployeeProfile>
      <Navbar />
      <PageContainer>
        <Sidebar placement="left">
          <UserList />
        </Sidebar>
        <Profile />
      </PageContainer>
    </StEmployeeProfile>
  );
};
export default EmployeeProfile;
