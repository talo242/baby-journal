import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Colors from '../../components/Colors';
import { TaskListContainer } from './TaskList';

const TaskListPlaceholderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 8px;
  height: 100%;
`;

const TaskListPlaceholderText = styled.p`
  font-size: 14px;
  color: ${Colors.gray};
  max-width: 100px;
`;

const TaskListPlaceholder = () => {
  return (
    <TaskListContainer>
      <TaskListPlaceholderContainer>
        <Image src="/task-list-placeholder.svg" width="74" height="76" />
        <TaskListPlaceholderText>
          Select a routine to see it’s tasks
        </TaskListPlaceholderText>
      </TaskListPlaceholderContainer>
    </TaskListContainer>
  );
};

export default TaskListPlaceholder;
