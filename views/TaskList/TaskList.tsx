import React, { useState } from 'react';
import styled from 'styled-components';
import Loader from '../../components/Loader/Loader';
import { H1 } from '../../components/Typography/Typography';
import Task from './Task';
import { CreateNewButton } from '../../components/Button/Button';
import CreateTaskModal from './CreateTaskModal';

export const TaskListContainer = styled.div`
  flex: 1;
  background: white;
  border-radius: 4px;
  padding: 42px;
`;

const TaskList = (props) => {
  const { data, error, token } = props;
  const [createTask, setCreateTask] = useState<boolean>(false);
  const toggleCreateRoutine = () => setCreateTask(!createTask);

  if (!data && !error) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div>
        <H1>{data.findRoutineByID.title}</H1>
        {data.findRoutineByID.tasks.data.map((task) => (
          <Task key={task._id} task={task} />
        ))}
        <CreateNewButton onClick={toggleCreateRoutine}>
          + Create new task
        </CreateNewButton>
      </div>
      {createTask && (
        <CreateTaskModal
          token={token}
          routine={data.findRoutineByID}
          onClose={toggleCreateRoutine}
        />
      )}
    </>
  );
};

export default TaskList;
