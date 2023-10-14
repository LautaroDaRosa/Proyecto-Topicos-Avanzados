import EmployeeData from '../../components/EmployeeData';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NotFoundPage } from '../NotFoundPage';
import StCardAndPosts from './StCardAndPosts';
import StProfileContainer from './StProfileContainer';
import FeedPost from 'app/components/FeedPost';
import PostsContainer from 'app/components/PostsContainer';
import { EmployeeWithPosts } from 'types';
import { getEmployee } from 'store/employees/api';

const Profile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState<EmployeeWithPosts>();
  const [requestErr, setRequestErr] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        if (id !== undefined) {
          const result = await getEmployee(parseInt(id));
          setEmployee(result);
        }
      } catch (error) {
        console.error(error);
        setRequestErr(true);
      }
    }
    fetchUser();
  }, [id]);

  if (employee === undefined) {
    return requestErr ? (
      <StProfileContainer>
        <NotFoundPage />
      </StProfileContainer>
    ) : (
      <></>
    );
  }
  return (
    <StProfileContainer>
      <StCardAndPosts>
        <EmployeeData
          fullname={employee.fullname}
          photo={employee.photo}
          dayOfBirth={employee.dayOfBirth}
          city={employee.city}
          entryDate={employee.entryDate}
        />
        <PostsContainer
          employeeName={employee.fullname.split(' ')[0]}
          hasPosts={employee.posts?.length !== 0}
        >
          {employee.posts?.map(post => (
            <FeedPost
              id={post.id}
              content={post.content}
              photo={post.photo}
              key={post.id}
              createdAt={post.createdAt}
              user={{
                id: id !== undefined ? parseInt(id) : -1,
                fullname: employee.fullname,
                photo: employee.photo,
              }}
            />
          ))}
        </PostsContainer>
      </StCardAndPosts>
    </StProfileContainer>
  );
};

export default Profile;
