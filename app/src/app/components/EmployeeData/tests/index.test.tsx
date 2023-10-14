import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import EmployeeData from '../index';

describe('Employee Data', () => {
  it('renders employee data correctly', () => {
    const employeeData = {
      fullname: 'Eliana Rosselli',
      photo: 'employees/erosselli.png',
      dob: '2020-07-02',
      city: 'Montevideo',
      entry_date: '2014-10-31',
    };

    const { container } = render(
      <Router>
        <EmployeeData
          fullname={employeeData.fullname}
          photo={employeeData.photo}
          dayOfBirth={employeeData.dob}
          city={employeeData.city}
          entryDate={employeeData.entry_date}
        />
      </Router>,
    );

    const userPic = screen.getByRole('img', { name: 'User pic' });
    screen.getByRole('heading', { name: 'Eliana Rosselli' });
    screen.getByText('🎂 02/07/2020');
    screen.getByText('📍 Montevideo');
    screen.getByText('Working at 🐙 since: 31 October 2014');

    expect(userPic).toHaveAttribute('src', 'employees/erosselli.png');
    expect(container).toMatchSnapshot();
  });
});
