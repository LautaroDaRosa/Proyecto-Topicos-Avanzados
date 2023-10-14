import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StFeed from './StFeed';
import { getFeedPostsSelector } from 'store/content/selectors';
import { PostSlice } from 'store/content/slice';
import FeedPost from 'app/components/FeedPost';
import NewPost from 'app/components/NewPost';

const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getFeedPostsSelector);
  const { actions } = PostSlice();

  useEffect(() => {
    dispatch(actions.fetchPosts());
  }, [dispatch, actions]);

  return (
    <StFeed>
      <NewPost />
      {posts?.map(post => (
        <FeedPost
          id={post.id}
          content={post.content}
          photo={post.photo}
          key={post.id}
          user={{
            id: post.user.id,
            fullname: post.user.fullname,
            photo: post.user.photo,
          }}
          createdAt={post.createdAt}
        />
      ))}
    </StFeed>
  );
};
export default Feed;
