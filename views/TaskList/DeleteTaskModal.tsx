import React, { useState } from 'react';
import { Button, Modal } from '../../components';
import { Error } from '../../components/Layout/LoginLayout';
import { ModalFormFooter } from '../../components/Modal/Modal';
import styled from 'styled-components';
import useFetchRoutine from '../../utils/useFetchRoutine';
import useDeleteTaskMutation from '../../utils/useDeleteTaskMutation';

const TextContainer = styled.div`
  margin-bottom: 32px;
`;

const DeleteTaskModal = (props) => {
  const { onClose, token, routine, task } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | undefined>();
  const { mutate: updateRoutine } = useFetchRoutine(routine._id, token);
  const deleteTask = useDeleteTaskMutation(token)

  const handleDeleteTask = async () => {
    try {
      setLoading(true);
      await deleteTask({
        id: task._id,
      });
      updateRoutine().then(() => {
        setLoading(false);
        onClose();
      });
    } catch (error) {
      setDeleteError(error.message);
    }
  };

  return (
    <Modal title="Delete routine" onClose={onClose}>
      <TextContainer>
        <p>Are you sure you want to delete the task <b>{task.title}</b>?</p>
        <p style={{ color: 'red' }}>This action cannot be undone</p>
      </TextContainer>
      <ModalFormFooter>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          loading={loading}
          disabled={loading}
          onClick={handleDeleteTask}
        >
          Delete
        </Button>
      </ModalFormFooter>
      {deleteError && <Error>{deleteError}</Error>}
    </Modal>
  );
};

export default DeleteTaskModal;
