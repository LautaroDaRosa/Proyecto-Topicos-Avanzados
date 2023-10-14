import styled from 'styled-components';

const StUserCard = styled.div`
  border-radius: 4px;
  display: flex;
  padding: 10px;
  transition: 0.2s background-color ease-in-out;
  text-decoration: none;

  img {
    width: 28px;
    border-radius: 50%;
    margin-right: 12px;
  }

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 18px;
    transition: 0.2s;
  }

  a:hover {
    color: #c70548;
  }

  :active a {
    color: #fca408;
  }
`;

export default StUserCard;
