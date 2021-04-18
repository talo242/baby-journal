import React, { useState } from 'react';
import useFetchAllRoutines from '../../utils/useFetchAllRoutines';
import { Button, Modal } from '../../components';
import { Error } from '../../components/Layout/LoginLayout';
import { useRouter } from 'next/router';
import { ModalFormFooter } from '../../components/Modal/Modal';
import styled from 'styled-components';
import useDeleteRoutineMutation from '../../utils/useDeleteRoutineMutation';

const TextContainer = styled.div`
  margin-bottom: 32px;
`;

const DeleteRoutineModal = (props) => {
  const { onClose, token, routine } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | undefined>();
  const { mutate: updateRoutines } = useFetchAllRoutines(token);
  const deleteRoutine = useDeleteRoutineMutation(token);
  const router = useRouter();

  const handleDeleteRoutine = async () => {
    try {
      setLoading(true);
      await deleteRoutine({
        id: routine._id,
      });
      updateRoutines().then(() => {
        router.push('/');
        setLoading(false);
      });
    } catch (error) {
      setDeleteError(error.message);
    }
  };

  return (
    <Modal title="Delete routine" onClose={onClose}>
      <TextContainer>
        <p>Are you sure you want to delete the routine {routine.title}?</p>
        <p style={{ color: 'red' }}>This action cannot be undone</p>
      </TextContainer>
      <ModalFormFooter>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          loading={loading}
          disabled={loading}
          onClick={handleDeleteRoutine}
        >
          Delete
        </Button>
      </ModalFormFooter>
      {deleteError && <Error>{deleteError}</Error>}
    </Modal>
  );
};

export default DeleteRoutineModal;
