import React from 'react';

import Feed from '..';
import { fireEvent, screen } from '@testing-library/react';
import renderWithWrappers from 'utils/render';
import api from '../../../../store/content/api';

jest.mock('../../../../store/content/api');

describe('Feed', () =>
  it('adds a new post to the store and renders it', async () => {
    (api.addPost as jest.Mock).mockReturnValue(
      Promise.resolve({
        id: 1,
        user: {
          id: 33,
          fullname: 'Gonzalo Martinez',
          photo: 'http://localhost:8000/media/employees/perfil.jpeg',
        },
        content: 'This is a test',
        photo: null,
        createdAt: '2023-09-05T14:29:36.606126Z',
      }),
    );
    renderWithWrappers(<Feed />);
    const input = screen.getByRole('textbox');
    expect(input.getAttribute('placeholder')).toEqual('Share something');
    const button = screen.getByRole('button');

    const postContent = 'This is a test';

    fireEvent.change(input, { target: { value: postContent } });
    fireEvent.click(button);

    expect(api.addPost).toHaveBeenCalledWith({
      content: 'This is a test',
    });

    await screen.findByText('Gonzalo Martinez');
    await screen.findByText('This is a test');
  }));
