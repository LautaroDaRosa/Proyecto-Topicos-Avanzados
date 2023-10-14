import React from 'react';

import Feed from '..';
import { screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import renderWithWrappers from 'utils/render';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => {
  // We require the real module
  const originalRedux = jest.requireActual('react-redux');
  // And return it patching only the functions we need to mock
  return {
    ...originalRedux,
    useSelector: jest.fn(),
    useDispatch: jest.fn(() => mockDispatch),
  };
});

describe('Feed', () => {
  it('shows posts fetched from the store', () => {
    (useSelector as jest.Mock).mockReturnValue([
      {
        id: 1,
        user: {
          fullname: 'John Doe',
          id: 5,
        },
        content: 'Hello world',
        photo: 'example/photo/url.png',
      },
      {
        id: 3,
        user: {
          fullname: 'Jane Doe',
          id: 23,
        },
        content: 'Goodbye world',
      },
    ]);
    renderWithWrappers(<Feed />);

    // We check that the action to fetch posts was dispatched
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'postsSlice/fetchPosts',
    });

    // We check that the info for the 1st post is shown in the screen
    screen.getByText('Hello world');
    screen.getByText('John Doe');
    screen.getByRole('img', { name: 'Post pic!' });

    // // We check that the info for the 2st post is shown in the screen
    screen.getByText('Goodbye world');
    screen.getByText('Jane Doe');
  });
});
