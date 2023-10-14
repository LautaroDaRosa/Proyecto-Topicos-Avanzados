import styled from 'styled-components';
import { media } from 'styles/media';

const StNavOption = styled.div<{ isSelected: boolean }>`
  display: flex;
  padding: 12px 24px;
  align-items: center;
  border-radius: 8px;
  margin-right: 20px;
  flex-direction: column;
  justify-items: center;

  span {
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: capitalize;
    text-decoration: none;
    font-size: 14px;
  }

  img {
    width: 24px;
  }

  ${media.large} {
    img {
      display: none;
    }
    span {
      font-size: 20px;
    }
  }

  ${props =>
    props.isSelected &&
    `
      span {
        color: #c70548;
      }
      cursor: default;
    `}

  ${props =>
    !props.isSelected &&
    `
      span {
        color: #1c1a46;
      }

      &:hover {
        background-color: #f1f1f5;
    `}
`;

export default StNavOption;
