import React from 'react';
import PencilIcon from '../Icons/PencilIcon';
import styled from 'styled-components';

interface EditButtonProps {
  onClick: () => void;
}

const OptionsButton = styled.button`
  border: none;
  padding: 8px 10px;
  border-radius: 4px;
  background-color: white;

  &:hover {
    background-color: #efefef;
  }
`;

const EditButton = (props: EditButtonProps) => {
  const { onClick } = props;

  return (
    <OptionsButton onClick={onClick} aria-label="Edit routine">
      <PencilIcon />
    </OptionsButton>
  );
};

export default EditButton;
