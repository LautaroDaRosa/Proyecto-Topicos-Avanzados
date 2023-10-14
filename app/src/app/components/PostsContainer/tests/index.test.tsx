import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PostsContainer from '..';
import FeedPost from 'app/components/FeedPost';

describe('Employee Posts', () => {
  it('renders empty posts correctly', () => {
    const name = 'Eliana';
    render(
      <Router>
        <PostsContainer hasPosts={false} employeeName={name} />
      </Router>,
    );

    screen.getByText(name + "'s Posts");
    screen.getByText('Hi there!');
    screen.getByText(name + " hasn't posted anything yet. Stay tunned!");
  });
  it('renders employee posts correctly', () => {
    const post = {
      id: 1,
      content: 'This is my first post!',
      photo: 'image.png',
      key: 1,
      userFullname: 'Eliana Rosselli',
      userPhoto: 'employees/erosselli.png',
      datetime: '2020-07-21T16:38:37.971545Z',
      userId: 12,
    };
    const name = 'Eliana';
    const { container } = render(
      <Router>
        <PostsContainer hasPosts={true} employeeName={name}>
          <FeedPost
            id={post.id}
            content={post.content}
            photo={post.photo}
            key={post.id}
            user={{
              id: post.userId,
              fullname: post.userFullname,
              photo: post.userPhoto,
            }}
            createdAt={post.datetime}
          />
        </PostsContainer>
      </Router>,
    );

    screen.getByText(name + "'s Posts");
    screen.getByText('Eliana Rosselli');
    screen.getByText('This is my first post!');
    screen.getByText('July 21, 2020');
    screen.getByRole('img', { name: 'Post pic!' });
    screen.getByRole('img', { name: 'User pic' });

    expect(container).toMatchSnapshot();
  });
});
