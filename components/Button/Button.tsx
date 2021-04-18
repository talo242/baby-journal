import React from 'react';
import styled from 'styled-components';
import Colors from '../Colors';
import Spinner from '../Loader/Spinner';

interface ButtonProps {
  children: React.ReactNode;
  type: string;
  disabled: boolean;
  loading?: boolean;
}

const BaseButton = styled.button`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Nunito', Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  letter-spacing: 0.04em;
  line-height: 16px;
  margin: 0;
  padding: 12px 24px;
  background-color: ${Colors.primary};
  color: white;
  display: flex;
  align-items: center;

  &:active {
    filter: brightness(0.95);
  }

  &:hover {
    filter: brightness(0.95);
    box-shadow: 0 0 0 3px ${Colors.primaryLighter};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${Colors.primaryLight};
  }

  ${(props) =>
    props.disabled &&
    `
    background-color: ${Colors.gray2};
    cursor: not-allowed;

    &:active {
      filter: none;
    }

    &:hover, &:focus {
      filter: none;
      box-shadow: none;
    }
  `}

  svg {
    margin-right: 8px;
  }
`;

const Button = (props: ButtonProps) => {
  const { children, type, disabled, loading } = props;
  return (
    <BaseButton type={type} disabled={disabled}>
      {loading ? (
        <>
          <Spinner />
          Loading
        </>
      ) : (
        children
      )}
    </BaseButton>
  );
};

export default Button;
