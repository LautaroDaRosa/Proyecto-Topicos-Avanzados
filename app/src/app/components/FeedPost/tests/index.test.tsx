import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import FeedPost from '../index';

describe('Feed Post', () => {
  it('renders post data correctly', () => {
    const postInfo = {
      id: 1,
      content: 'Quien esta para Lokotas?',
      photo:
        'https://lokotas.com.uy/wp-content/uploads/2019/04/iso-lokotas.png',
      userFullname: 'Ramiro Nieto',
      userPhoto: 'employees/rnieto.png',
      datetime: '2020-07-21 19:18:03.496513+00',
    };

    const { container } = render(
      <Router>
        <FeedPost
          id={postInfo.id}
          content={postInfo.content}
          photo={postInfo.photo}
          key={postInfo.id}
          user={{
            id: 1,
            fullname: postInfo.userFullname,
            photo: postInfo.userPhoto,
          }}
          createdAt={postInfo.datetime}
        />
      </Router>,
    );

    const postPic = screen.getByRole('img', { name: 'Post pic!' });
    const userPic = screen.getByRole('img', { name: 'User pic' });
    screen.getByText('Ramiro Nieto');
    screen.getByText('July 21, 2020');
    screen.getByText('Quien esta para Lokotas?');

    expect(userPic).toHaveAttribute('src', 'employees/rnieto.png');
    expect(postPic).toHaveAttribute(
      'src',
      'https://lokotas.com.uy/wp-content/uploads/2019/04/iso-lokotas.png',
    );

    expect(container).toMatchSnapshot();
  });
});
