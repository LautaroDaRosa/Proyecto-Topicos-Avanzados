import { useState } from 'react';
import Button from '../Button';
import StInput from './StInput';
import StNewPost from './StNewPost';
import { PostSlice } from 'store/content/slice';
import { useDispatch } from 'react-redux';

const NewPost = () => {
  const [content, setContent] = useState('');

  const dispatch = useDispatch();
  const { actions } = PostSlice();

  const handleSubmit = e => {
    e.preventDefault();
    if (content.trim() !== '') {
      dispatch(actions.addPost({ content: content }));
      setContent('');
    }
  };

  const handleInputChange = e => {
    setContent(e.target.value);
  };

  return (
    <StNewPost onSubmit={handleSubmit}>
      <StInput
        placeholder="Share something"
        value={content}
        onChange={handleInputChange}
      />
      <Button
        type="submit"
        action="primary"
        text="Post!"
        disabled={content.trim() === ''}
      />
    </StNewPost>
  );
};

export default NewPost;
