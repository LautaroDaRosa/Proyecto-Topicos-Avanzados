import currentUser from 'utils/currentUser';
import StInviteCard from './StInviteCard';
import Input from './Input';
import { useState } from 'react';
import InputButtonContainer from './InputButtonContainer';
import Button from '../Button';
// import { sendInvitation } from 'store/invitation/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const invitedRole = {
  ADMIN: 'Socio',
  PARTNER: 'Proveedor',
};

const isValidMail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const SendInvite = () => {
  const currentU = currentUser.get();
  const role = invitedRole[currentU.role];
  const [mail, setMail] = useState('');

  const invite = () => {
    /*   async function inviteUser() {
      await sendInvitation(mail);
    }
    inviteUser().then(showToast); */
    finishInvite();
  };

  const finishInvite = () => {
    showToast();
    setMail('');
  };

  const showToast = () => {
    toast.success('Mail de invitación enviado', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  return (
    <StInviteCard>
      <h3>Invitar a un {role}</h3>
      <span>
        Ingresa el correo electrónico del {role} al que que invitar a la
        aplicación.
      </span>
      <InputButtonContainer>
        <Input
          value={mail}
          onChange={e => setMail(e.target.value)}
          placeholder="Ingresar un mail válido"
        />
        <Button
          action="primary"
          disabled={!isValidMail(mail)}
          text="Invitar"
          onClick={invite}
        />
      </InputButtonContainer>
    </StInviteCard>
  );
};

export default SendInvite;
