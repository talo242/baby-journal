import React from 'react';
import styled from 'styled-components';
import CloseIcon from '../Icons/CloseIcon';
import { H1 } from '../Typography/Typography';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalDialog = styled.div`
  background-color: white;
  padding: 30px 48px 48px;
  border-radius: 8px;
  width: 100%;
  max-width: 480px;
`;

const ModalHeader = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: center;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  margin-left: auto;
  padding: 4px 10px;
`

export const ModalFormFooter = styled.div`
  display: flex;
  button:first-child {
    margin-left: auto;
  }
  button:last-child {
    margin-left: 8px;
  }
`;


const Modal = (props: ModalProps) => {
  const { children, onClose, title } = props;

  const handleDialogClick = (e) => {
    e.stopPropagation()
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalDialog onClick={handleDialogClick}>
        <ModalHeader>
          {title && <H1>{title}</H1>}
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </ModalHeader>
        {children}
      </ModalDialog>
    </ModalOverlay>
  );
};

export default Modal;
