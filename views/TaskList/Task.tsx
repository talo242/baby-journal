import React from 'react';
import styled from 'styled-components';
import Colors from '../../components/Colors';
import dayjs from 'dayjs';

const TaskContainer = styled.div`
  display: flex;
  padding: 8px;
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

  ${({ completed }) =>
    completed &&
    `
    filter: opacity(0.5);
  
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
 
  ${({ overdue}) => overdue && `
    color: red;
  `}
`

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
  const { task } = props;
  const due = dayjs(task.due)
  const overdue = due.isBefore(dayjs()) && !task.completed
  return (
    <TaskContainer>
      <CheckButton>{task.completed ? <Checked /> : <Check />}</CheckButton>
      <TaskP completed={task.completed}>
        <span>{task.title}</span>
        <Time overdue={overdue}>{due.format('HH:mm')} hrs.</Time>
      </TaskP>
    </TaskContainer>
  );
};

export default Task;
