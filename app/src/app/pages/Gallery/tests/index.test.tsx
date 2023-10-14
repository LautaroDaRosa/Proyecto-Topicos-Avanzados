import { fireEvent, screen, waitFor } from '@testing-library/react';
import api from '../../../../store/content/api';
import employeeApi from '../../../../store/employees/api';
import Gallery from '..';
import renderWithWrappers from 'utils/render';

jest.mock('../../../../store/content/api');
jest.mock('../../../../store/employees/api');

describe('Gallery', () => {
  it('shows pictures fetched from the backend correctly', async () => {
    (api.getPictures as jest.Mock).mockReturnValue(
      Promise.resolve([
        {
          id: 1,
          title: "A day at Octobot's office",
          photo: 'pictures/pic1.jpeg',
          featured: true,
        },
        {
          id: 2,
          title: 'Octobot Office',
          photo: 'pictures/pic2.jpeg',
          featured: true,
        },
        {
          id: 3,
          title: 'Octobot Team',
          photo: 'pictures/pic3.jpeg',
          featured: false,
        },
      ]),
    );

    (employeeApi.getPermissions as jest.Mock).mockReturnValue(
      Promise.resolve([]),
    );

    const { container } = renderWithWrappers(<Gallery />);

    expect(api.getPictures).toHaveBeenCalledWith();

    await screen.findByText('Octobot Office');
    screen.getByText("A day at Octobot's office");

    const img1 = screen.getByRole('img', { name: "A day at Octobot's office" });
    const img2 = screen.getByRole('img', { name: 'Octobot Office' });
    const img3 = screen.getByRole('img', { name: 'Octobot Team' });

    expect(img1.getAttribute('src')).toBe('pictures/pic1.jpeg');
    expect(img2.getAttribute('src')).toBe('pictures/pic2.jpeg');
    expect(img3.getAttribute('src')).toBe('pictures/pic3.jpeg');

    expect(container).toMatchSnapshot();
  });

  it('displays the delete button when user is allowed', async () => {
    (api.getPictures as jest.Mock).mockReturnValue(
      Promise.resolve([
        {
          id: 1,
          title: "A day at Octobot's office",
          photo: 'pictures/pic1.jpeg',
          featured: true,
        },
      ]),
    );

    (employeeApi.getPermissions as jest.Mock).mockReturnValue(
      Promise.resolve(['content.delete_picture']),
    );

    renderWithWrappers(<Gallery />);

    expect(employeeApi.getPermissions).toHaveBeenCalledWith();
    await screen.findByRole('img', { name: "A day at Octobot's office" });

    screen.getByRole('button');
  });

  it('does not display the delete button when user is not allowed', async () => {
    (api.getPictures as jest.Mock).mockReturnValue(
      Promise.resolve([
        {
          id: 1,
          title: "A day at Octobot's office",
          photo: 'pictures/pic1.jpeg',
          featured: true,
        },
      ]),
    );

    (api.deletePicture as jest.Mock).mockReturnValue(Promise.resolve({}));

    (employeeApi.getPermissions as jest.Mock).mockReturnValue(
      Promise.resolve([]),
    );

    renderWithWrappers(<Gallery />);

    expect(employeeApi.getPermissions).toHaveBeenCalledWith();
    await screen.findByRole('img', { name: "A day at Octobot's office" });

    const btn = screen.queryByRole('button');
    expect(btn).toBeNull();
  });

  it('deletes the picture correctly', async () => {
    (api.getPictures as jest.Mock).mockReturnValue(
      Promise.resolve([
        {
          id: 1,
          title: "A day at Octobot's office",
          photo: 'pictures/pic1.jpeg',
          featured: true,
        },
      ]),
    );

    (api.deletePicture as jest.Mock).mockReturnValue(Promise.resolve({}));

    (employeeApi.getPermissions as jest.Mock).mockReturnValue(
      Promise.resolve(['content.delete_picture']),
    );

    renderWithWrappers(<Gallery />);

    expect(employeeApi.getPermissions).toHaveBeenCalledWith();

    await screen.findByRole('img', { name: "A day at Octobot's office" });

    const btn = screen.getByRole('button', { name: 'Delete' });

    fireEvent.click(btn);

    await waitFor(() =>
      expect(
        screen.queryByRole('img', {
          name: "A day at Octobot's office",
        }),
      ).toBeNull(),
    );
  });
});
