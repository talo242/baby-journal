import React, { useState } from 'react';
import useUser from '../../utils/useUser';
import dayjs from 'dayjs';
import useFetchRoutine from '../../utils/useFetchRoutine';
import useCreateTaskMutation from '../../utils/useCreateTaskMutation';
import TaskForm from './TaskForm';

const CreateTaskModal = (props) => {
  const { onClose, token, routine } = props;
  const [createError, setCreateError] = useState<string | undefined>();
  const { mutate } = useFetchRoutine(routine._id, token);
  const { data: user } = useUser();
  const createTaskMutation = useCreateTaskMutation(token);

  const handleCreateTask = async (values) => {
    const parsedTime = values.due.split(':');
    const due = dayjs().hour(parsedTime[0]).minute(parsedTime[1]);

    try {
      await createTaskMutation({
        title: values.title,
        due: due,
        routine: routine._id,
        owner: user.id,
      });
      /** Update routine after adding a new task */
      mutate();
    } catch (error) {
      setCreateError(error.message);
    }
  };

  return (
    <TaskForm
      onSubmit={handleCreateTask}
      onClose={onClose}
      error={createError}
      buttonText="Create"
    />
  );
};

export default CreateTaskModal;
