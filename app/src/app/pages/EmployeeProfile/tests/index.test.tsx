import { axiosInstance } from 'utils/axios';
import { screen } from '@testing-library/react';
import renderWithWrappers from 'utils/render';
import Profile from '../Profile';

jest.mock('utils/axios', () => ({
  axiosInstance: {
    get: jest.fn(() =>
      Promise.resolve({
        data: {
          fullname: 'Eliana Rosselli',
          photo: 'http://localhost:8000/media/employees/erosselli.png',
          dayOfBirth: '2020-07-02',
          city: 'Montevideo',
          entryDate: '2014-10-31',
          posts: [
            {
              id: 1,
              content: 'Bienvenidos al equipo!! 🐙🤗',
              photo: null,
              createdAt: '2020-07-21T16:38:37.971545Z',
            },
          ],
        },
      }),
    ),
  },
}));

jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useParams: jest.fn(() => ({ id: 12 })),
  };
});

describe('Employee Data', () => {
  it('shows employee fetched from the backend', async () => {
    renderWithWrappers(<Profile />);

    // We check that the action to fetch posts was dispatched
    expect(axiosInstance.get).toHaveBeenCalledWith('/api/users/12/');
    const names = await screen.findAllByText('Eliana Rosselli');
    expect(names.length).toEqual(2);
    await screen.findByText("Eliana's Posts");
    await screen.findByText('Bienvenidos al equipo!! 🐙🤗');
  });
});
