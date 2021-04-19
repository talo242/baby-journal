import React, { useState } from 'react';
import styled from 'styled-components';
import Loader from '../../components/Loader/Loader';
import { H1 } from '../../components/Typography/Typography';
import Task from './Task';
import { CreateNewButton } from '../../components/Button/Button';
import CreateTaskModal from './CreateTaskModal';
import Head from 'next/head';
import UpdateRoutineModal from '../RoutineList/UpdateRoutineModal';
import DeleteRoutineModal from '../RoutineList/DeleteRoutineModal';
import { OptionsDropdown } from '../../components';
import CompletedNotification from '../../components/Button/CompletedNotification/CompletedNotification';

export const TaskListContainer = styled.div`
  width: 75%;
  background: white;
  border-radius: 4px;
  padding: 42px;
`;

const RoutineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskList = (props) => {
  const { data, error, token } = props;
  const [createTask, setCreateTask] = useState<boolean>(false);
  const [updateRoutineHanlder, setUpdateRoutine] = useState<boolean>(false);
  const [deleteRoutine, setDeleteRoutine] = useState<boolean>(false);

  const toggleCreateTask = () => setCreateTask(!createTask);
  const toggleUpdateRoutine = () => setUpdateRoutine(!updateRoutineHanlder);
  const toggleDeleteRoutine = () => setDeleteRoutine(!deleteRoutine);

  if (!data && !error) return <Loader />;
  if (error) return <p>{error}</p>;

  const tasksLeft = data.findRoutineByID.tasks.data.reduce((acc, task) => {
    if (!task.completed) {
      return ++acc;
    }
    return acc;
  }, 0);

  return (
    <>
      <Head>
        <title>{data.findRoutineByID.title} | BabyDo</title>
      </Head>
      <div>
        <RoutineHeader>
          <H1>{data.findRoutineByID.title}</H1>
          <div>
            <OptionsDropdown
              onEdit={toggleUpdateRoutine}
              onDelete={toggleDeleteRoutine}
            />
          </div>
        </RoutineHeader>
        {data.findRoutineByID.tasks.data.map((task) => (
          <Task
            key={task._id}
            token={token}
            task={task}
            routine={data.findRoutineByID}
          />
        ))}
        <CreateNewButton onClick={toggleCreateTask}>
          + Create new task
        </CreateNewButton>
      </div>
      {createTask && (
        <CreateTaskModal
          token={token}
          routine={data.findRoutineByID}
          onClose={toggleCreateTask}
        />
      )}
      {updateRoutineHanlder && (
        <UpdateRoutineModal
          onClose={toggleUpdateRoutine}
          token={token}
          routine={data.findRoutineByID}
        />
      )}
      {deleteRoutine && (
        <DeleteRoutineModal
          onClose={toggleDeleteRoutine}
          token={token}
          routine={data.findRoutineByID}
        />
      )}
      {tasksLeft === 0 && <CompletedNotification />}
    </>
  );
};

export default TaskList;
