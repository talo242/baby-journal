import React from 'react';
import TaskList, { TaskListContainer } from './TaskList';

const TaskContainer = (props) => {
  const { data, error, token } = props;
  return (
    <TaskListContainer>
      <TaskList token={token} data={data} error={error} />
    </TaskListContainer>
  );
};

export default TaskContainer;
