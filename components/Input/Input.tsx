import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik'
import Colors from '../Colors';

interface InputProps {
  type?: string;
  name: string;
  label: string;
  className?: string;
}

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

const LabelText = styled.p`
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  margin-top: 0;
  color: ${Colors.gray}
`;
const StyledInput = styled(Field)`
  height: 40px;
  box-sizing: border-box;
  border: 1px solid ${Colors.primary};
  border-radius: 4px;
  font-size: 14px;
  font-family: 'Nunito', Arial, Helvetica, sans-serif;
  padding: 0 16px;
  margin: 0 0 16px;
  transition: all 0.1s ease;
  vertical-align: middle;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${Colors.primaryLight};
  }
`;

const Input = (props: InputProps) => {
  const { type, name, label, className } = props;
  return (
    <StyledLabel className={className}>
      <LabelText>{label}</LabelText>
      <StyledInput type={type || 'text'} name={name} {...props} />
    </StyledLabel>
  );
};

export default Input;
