import React, { useState } from 'react';
import RoutineForm from './RoutineForm';
import useUpdateRoutineMutation from '../../utils/useUpdateRoutineMutation';
import useFetchAllRoutines from '../../utils/useFetchAllRoutines';
import useFetchRoutine from '../../utils/useFetchRoutine';

const UpdateRoutineModal = (props) => {
  const { onClose, token, routine } = props;
  const [createError, setCreateError] = useState<string | undefined>();
  const { mutate: updateRoutines } = useFetchAllRoutines(token);
  const { mutate: updateCurrentRoutine } = useFetchRoutine(routine._id, token);
  const updateRoutine = useUpdateRoutineMutation(token);

  const handleUpdateRoutine = async (values) => {
    try {
      await updateRoutine({
        id: routine._id,
        title: values.title,
      });
      updateRoutines()
      updateCurrentRoutine()
    } catch (error) {
      setCreateError(error.message);
    }
  };

  return (
    <RoutineForm
      title="Update routine"
      onClose={onClose}
      onSubmit={handleUpdateRoutine}
      error={createError}
      buttonText="Update"
      initialValues={{ title: routine.title }}
    />
  );
};

export default UpdateRoutineModal;
