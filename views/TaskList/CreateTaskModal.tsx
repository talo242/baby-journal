import Modal from '../../components/Modal';
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  InputContainer,
  StyledErrorMessage,
} from '../../components/Layout/LoginLayout';
import { Button, Input } from '../../components';
import styled from 'styled-components';
import { graphQLClient } from '../../utils/graphql-client';
import { gql } from 'graphql-request';
import useUser from '../../utils/useUser';
import dayjs from 'dayjs';
import useFetchRoutine from '../../utils/useFetchRoutine';

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  due: Yup.string().required('Required'),
});

const ModalFormFooter = styled.div`
  display: flex;
  button:first-child {
    margin-left: auto;
  }
  button:last-child {
    margin-left: 8px;
  }
`;

const CreateTaskModal = (props) => {
  const { onClose, token, routine } = props;
  const [crateError, setCreateError] = useState<string | undefined>();
  const { mutate } = useFetchRoutine(routine._id, token);
  const { data: user } = useUser();

  const handleCreateTask = async (values) => {
    const parsedTime = values.due.split(':');
    const due = dayjs().hour(parsedTime[0]).minute(parsedTime[1]);
    const mutation = gql`
      mutation CreateTaskMutation(
        $title: String!
        $due: Time!
        $routine: ID!
        $owner: ID!
      ) {
        createTask(
          data: {
            title: $title
            due: $due
            completed: false
            owner: { connect: $owner }
            routine: { connect: $routine }
          }
        ) {
          _id
          title
          completed
        }
      }
    `;

    try {
      await graphQLClient(token).request(mutation, {
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
    <Modal title="Create a new task" onClose={onClose}>
      <Formik
        initialValues={{ title: '', due: '' }}
        validationSchema={TaskSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleCreateTask(values).then(() => {
            setSubmitting(false);
            onClose();
          });
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <InputContainer>
              <Input label="Title *" name="title" />
              <StyledErrorMessage name="title" component="div" />
            </InputContainer>
            <InputContainer>
              <Input label="Due *" type="time" name="due" />
              <StyledErrorMessage name="due" component="div" />
            </InputContainer>
            <ModalFormFooter>
              <Button variant="outlined" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button
                loading={isSubmitting}
                type="submit"
                disabled={isSubmitting}
              >
                Create
              </Button>
            </ModalFormFooter>
          </Form>
        )}
      </Formik>
      {crateError && <p>{crateError}</p>}
    </Modal>
  );
};

export default CreateTaskModal;
