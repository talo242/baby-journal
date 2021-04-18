import React from 'react';
import styled from 'styled-components';
import Loader from '../Loader/Loader';
import { H1 } from '../Typography/Typography';

export const TaskListContainer = styled.div`
  flex: 1;
  background: white;
  border-radius: 4px;
  padding: 42px;
`;

const TaskList = (props) => {
  const { data, error } = props;

  if (!data && !error) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <H1>{data.findRoutineByID.title}</H1>
      {data.findRoutineByID.tasks.data.map((task) => (
        <p>{task.title}</p>
      ))}
    </div>
  );
};

const TaskContainer = (props) => {
  const { data, error } = props;
  return (
    <TaskListContainer>
      <TaskList data={data} error={error} />
    </TaskListContainer>
  );
};

export default TaskContainer;
