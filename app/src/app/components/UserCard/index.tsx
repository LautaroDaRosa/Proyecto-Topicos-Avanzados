import { Link } from 'react-router-dom';
import StUserCard from './StUserCard';
import { MinimalEmployee } from 'types';

const UserCard = ({ id, fullname, photo }: MinimalEmployee) => (
  <StUserCard>
    <Link to={`/profile/${id}`} id={`user-${id}`}>
      <img src={photo} aria-labelledby={`user-${id}`} />
      {fullname}
    </Link>
  </StUserCard>
);

export default UserCard;
