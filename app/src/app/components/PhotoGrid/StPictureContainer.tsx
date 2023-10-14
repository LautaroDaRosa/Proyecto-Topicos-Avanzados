import styled from 'styled-components';

const StPictureContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  position: relative;
  overflow: hidden;

  :hover span {
    display: flex;
  }

  img {
    width: 100%;
    transition: filter 0.1s;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  :hover > img {
    filter: brightness(75%);
    transform: scale(1.1);
  }

  :hover div {
    opacity: 100%;
  }
`;

export default StPictureContainer;
