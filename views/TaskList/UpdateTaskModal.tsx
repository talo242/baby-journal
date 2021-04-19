import React, { useState } from 'react';
import dayjs from 'dayjs';
import useFetchRoutine from '../../utils/useFetchRoutine';
import TaskForm from './TaskForm';
import useUpdateTaskMutation from '../../utils/useUpdateTaskMutation';

const UpdateTaskModal = (props) => {
  const { onClose, token, routine, task } = props;
  const [createError, setCreateError] = useState<string | undefined>();
  const { mutate } = useFetchRoutine(routine._id, token);
  const updateTaskMutation = useUpdateTaskMutation(token);

  const handleUpdateTask = async (values) => {
    const parsedTime = values.due.split(':');
    const due = dayjs().hour(parsedTime[0]).minute(parsedTime[1]);
    try {
      await updateTaskMutation({
        id: task._id,
        title: values.title,
        due: due,
        completed: task.completed,
      });
      /** Update routine after adding a new task */
      mutate();
    } catch (error) {
      setCreateError(error.message);
    }
  };

  const due = `${dayjs(task.due).format('HH').toString()}:${dayjs(task.due).format('mm').toString()}`;

  return (
    <TaskForm
      onSubmit={handleUpdateTask}
      onClose={onClose}
      error={createError}
      initialValues={{ title: task.title, due }}
      buttonText="Edit"
    />
  );
};

export default UpdateTaskModal;
