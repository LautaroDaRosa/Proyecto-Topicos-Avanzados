import React from 'react';
import StTitle from './StTitle';

const Title = ({ text }: TextProps) => <StTitle>{text}</StTitle>;

type TextProps = {
  text: string;
};

export default Title;
