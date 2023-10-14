import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserCard from '../index';

test('Test render Card', () => {
  const userInfo = {
    fullname: 'Pepocho Tentáculos',
    photo:
      'https://brand.octobot.io/images/Octobot_Mark_Mono_Positive-p-500.jpeg',
    id: 3,
  };

  const { container } = render(
    <Router>
      <UserCard
        id={userInfo.id}
        fullname={userInfo.fullname}
        photo={userInfo.photo}
      />
    </Router>,
  );

  const user = screen.getByRole('link', { name: 'Pepocho Tentáculos' });
  expect(user).toHaveAttribute('href', '/profile/3');
  within(user).getByRole('img', { name: 'Pepocho Tentáculos' });
  // snapshot test
  expect(container).toMatchSnapshot();
});
