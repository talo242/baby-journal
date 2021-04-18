import React, { useState } from 'react';
import useUser from '../../utils/useUser';
import RoutineForm from './RoutineForm';
import useCreateRoutineMutation from '../../utils/useCreateRoutineMutation';

const CreateRoutineModal = (props) => {
  const { onClose, token, updateRoutines } = props;
  const [createError, setCreateError] = useState<string | undefined>();
  const { data: user } = useUser();
  const createRoutine = useCreateRoutineMutation(token);

  const handleCreateRoutine = async (values) => {
    try {
      await createRoutine({
        title: values.title,
        owner: user.id,
      });
      updateRoutines();
    } catch (error) {
      setCreateError(error.message);
    }
  };

  return (
    <RoutineForm
      title="Create a new routine"
      onClose={onClose}
      onSubmit={handleCreateRoutine}
      error={createError}
      buttonText="Create"
    />
  );
};

export default CreateRoutineModal;
