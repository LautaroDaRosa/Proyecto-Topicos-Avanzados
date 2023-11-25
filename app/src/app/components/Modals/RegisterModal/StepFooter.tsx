import React from 'react';
import StStepFooter from './styles/StStepFooter';
import StepDot from './styles/StepDot';

interface Props {
  stepsQty: number;
  currentStep: number;
}

const StepFooter = ({ stepsQty, currentStep }: Props) => {
  const stepDots = Array.from({ length: stepsQty }, (_, index) => (
    <StepDot key={index} active={index < currentStep} />
  ));

  return <StStepFooter>{stepDots}</StStepFooter>;
};

export default StepFooter;
