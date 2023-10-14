import StCard from './StCard';
import StDetails from './StDetails';
import StEmployeeData from './StEmployeeData';
import StTextContainer from './StTextContainer';
import ProfileImage from '../ProfileImage';
import Ball from '../Ball';
import { getFormattedBirthday } from 'utils/dates';
import { getFormattedEntryDate } from 'utils/dates';
import { Employee } from 'types';

const EmployeeData = ({
  fullname,
  photo,
  dayOfBirth,
  city,
  entryDate,
}: Employee) => {
  return (
    <StEmployeeData>
      <StCard>
        <ProfileImage type="profile" src={photo} alt="User pic" />
        <StDetails>
          <StTextContainer justify="left">
            <h2>{fullname}</h2>
            <span>Working at 🐙 since: {getFormattedEntryDate(entryDate)}</span>
          </StTextContainer>
          <StTextContainer justify="right">
            <span>{'🎂 ' + getFormattedBirthday(dayOfBirth)}</span>
            <span>{'📍 ' + city}</span>
          </StTextContainer>
        </StDetails>
      </StCard>
      <Ball width={93} height={98} color="white" type="profile-ball" />
      <Ball width={78} height={84} color="blue" type="profile-ball" />
    </StEmployeeData>
  );
};

export default EmployeeData;
