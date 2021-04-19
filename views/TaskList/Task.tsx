import React, { useState } from 'react';
import styled from 'styled-components';
import Colors from '../../components/Colors';
import dayjs from 'dayjs';
import useUpdateTaskMutation from '../../utils/useUpdateTaskMutation';
import useFetchRoutine from '../../utils/useFetchRoutine';
import UpdateTaskModal from './UpdateTaskModal';
import Spinner from '../../components/Icons/Spinner';
import DeleteTaskModal from './DeleteTaskModal';
import { OptionsDropdown } from '../../components';

const TaskContainer = styled.div`
  display: flex;
  padding: 8px 0 8px 8px;
  align-items: center;
`;

const CheckButton = styled.button`
  border: none;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${Colors.primaryLight};
  }
`;

const Check = styled.div`
  border: 1px solid ${Colors.gray};
  border-radius: 50%;
  width: 18px;
  height: 18px;
  background-color: white;
`;

const TaskP = styled.p`
  margin: 0 0 0 8px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;

  ${({ completed }) =>
    completed &&
    `
    span {
      filter: opacity(0.5);
    }
  
    &:after {
      content: '';
      width: 100%;
      height: 1px;
      background-color: ${Colors.primary};
      position: absolute;
      top: 50%;
    }
  `}
`;

const Time = styled.span`
  margin: 0 24px 0 auto;

  ${({ overdue }) =>
    overdue &&
    `
    color: red;
  `}
`;

const Checked = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 496 496"
    fill={Colors.primary}
    xmlns="http://www.w3.org/2000/svg"
    opacity="0.5"
  >
    <path d="M496 248C496 384.967 384.967 496 248 496C111.033 496 0 384.967 0 248C0 111.033 111.033 0 248 0C384.967 0 496 111.033 496 248ZM219.314 379.314L403.314 195.314C409.562 189.066 409.562 178.935 403.314 172.687L380.687 150.06C374.439 143.811 364.308 143.811 358.059 150.06L208 300.118L137.941 230.059C131.693 223.811 121.562 223.811 115.313 230.059L92.686 252.686C86.438 258.934 86.438 269.065 92.686 275.313L196.686 379.313C202.935 385.562 213.065 385.562 219.314 379.314V379.314Z" />
  </svg>
);

const Task = (props) => {
  const { task, token, routine } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [updateTaskHandler, setUpdateTaskHandler] = useState<boolean>(false);
  const [deleteTaskHandler, setDeleteTask] = useState<boolean>(false);
  const due = dayjs(task.due);
  const overdue = due.isBefore(dayjs()) && !task.completed;
  const updateTask = useUpdateTaskMutation(token);
  const { mutate: updateRoutine } = useFetchRoutine(routine._id, token);

  const toggleUpdateTask = () => setUpdateTaskHandler(!updateTaskHandler);
  const toggleDeleteTask = () => setDeleteTask(!deleteTaskHandler);

  const onUpdateTask = async (variables) => {
    try {
      setLoading(true);
      await updateTask(variables);
      await updateRoutine();
    } catch (error) {
      console.log(error.message);
    }
  };

  const onCheck = () => {
    onUpdateTask({
      id: task._id,
      title: task.title,
      due: task.due,
      completed: !task.completed,
    }).then(() => setLoading(false));
  };

  return (
    <>
      <TaskContainer>
        <CheckButton onClick={onCheck}>
          {loading && (
            <Spinner color={Colors.primary} height="18px" width="18px" />
          )}
          {!loading && (task.completed ? <Checked /> : <Check />)}
        </CheckButton>
        <TaskP completed={task.completed}>
          <span>{task.title}</span>
          <Time overdue={overdue}>{due.format('HH:mm')} hrs.</Time>
          <OptionsDropdown
            onEdit={toggleUpdateTask}
            onDelete={toggleDeleteTask}
          />
        </TaskP>
      </TaskContainer>
      {updateTaskHandler && (
        <UpdateTaskModal
          onClose={toggleUpdateTask}
          token={token}
          routine={routine}
          task={task}
        />
      )}
      {deleteTaskHandler && (
        <DeleteTaskModal
          onClose={toggleDeleteTask}
          token={token}
          routine={routine}
          task={task}
        />
      )}
    </>
  );
};

export default Task;
