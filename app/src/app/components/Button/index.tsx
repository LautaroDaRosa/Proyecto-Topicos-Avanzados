import React from 'react';
import styled, { css } from 'styled-components';

const StButton = styled.button<Omit<ButtonProps, 'text'>>`
  border-radius: 8px;
  height: 48px;
  font-size: 16px;
  padding: 12px 24px;
  transition: 0.1s;

  ${props =>
    props.action === 'primary' &&
    css`
      border: 1.5px solid #fca408;
      background-color: white;
      color: #fca408;

      &:disabled {
        border-color: #c0bfcb;
        color: #c0bfcb;
      }

      &:hover:enabled {
        cursor: pointer;
        color: white;
        background-color: #fca408;
      }

      &:active:enabled {
        color: white;
        background-color: #b27508;
        border-color: #b27508;
      }
    `};
`;

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  action?: string;
  disabled?: boolean;
};

const Button = ({ type, text, action, disabled }: ButtonProps) => (
  <StButton type={type} action={action} disabled={disabled}>
    {text}
  </StButton>
);

export default Button;
