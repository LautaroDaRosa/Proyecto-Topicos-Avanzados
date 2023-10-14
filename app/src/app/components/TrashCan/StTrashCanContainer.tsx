import styled from 'styled-components';

const fade = '0.3s ease';

const StTrashCan = styled.div`
  display: flex;

  width: 48px;
  height: 48px;
  border-radius: 32px;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0%;
  transition: opacity ${fade}, background ${fade};

  :hover {
    background: rgba(255, 255, 255, 0.8);
  }

  svg {
    color: #f2f2f4;
    transition: color ${fade};
  }

  :hover svg {
    color: #424065;
  }
`;

export default StTrashCan;
