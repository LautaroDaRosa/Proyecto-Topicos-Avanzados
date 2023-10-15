import styled from 'styled-components';
import { media } from 'styles/media';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 33px 60px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  margin: 48px;

  ${media.medium} {
    padding: 24px;
    margin-left: 128px;
    margin-right: 128px;
  }

  ${media.large} {
    margin: 0;
    padding: 64px;
    width: 50%;
    gap: 15px;
    z-index: 4;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    border-radius: 0 20px 20px 0;
  }

  img {
    width: 120px;
  }

  div {
    ${media.medium} {
      padding: 64px 136px 64px 136px;
    }
    ${media.large} {
      padding: 64px 132px 64px 132px;
    }
    gap: 8px;
    display: flex;
    flex-direction: column;
  }

  button {
    width: 100%;
    margin-top: 12px;
  }
`;

export default Form;
