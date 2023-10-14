import StFeedPost from './StFeedPost';
import StPusblisher from './StPublisher';
import { Link } from 'react-router-dom';
import ProfileImage from '../ProfileImage';
import StPostPicture from './StPostPicture';
import StDate from './StDate';
import { Post } from 'types';

const getFormattedDate = (date: string) => {
  return date
    ? new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
      }).format(new Date(date))
    : '-';
};

const FeedPost = ({ id, content, photo, createdAt, user }: Post) => {
  return (
    <StFeedPost>
      <StPusblisher>
        <ProfileImage type="post-publisher" src={user.photo} alt="User pic" />
        <div>
          <Link to={`/profile/${user.id}`} id={`user-${user.id}`}>
            <span>{user.fullname}</span>
          </Link>
          <StDate>{getFormattedDate(createdAt)}</StDate>
        </div>
      </StPusblisher>
      <span>{content}</span>
      {photo && <StPostPicture src={photo} alt="Post pic!" />}
    </StFeedPost>
  );
};

export default FeedPost;
