import React from 'react';
import styled from 'styled-components';
import TrashIcon from '../Icons/TrashIcon';

interface DeleteButtonProps {
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

const DeleteButton = (props: DeleteButtonProps) => {
  const { onClick } = props;

  return (
    <OptionsButton onClick={onClick} aria-label="Edit routine">
      <TrashIcon />
    </OptionsButton>
  );
};

export default DeleteButton;
