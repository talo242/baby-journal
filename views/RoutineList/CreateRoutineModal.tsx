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

const RoutineSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
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

const CreateRoutineModal = (props) => {
  const { onClose, token, updateRoutines } = props;
  const [crateError, setCreateError] = useState<string | undefined>();
  const { data: user } = useUser()

  const handleCreateRoutine = async (values) => {
    const query = gql`
      mutation CreateRoutine($title: String!, $owner: ID!) {
        createRoutine(data: { title: $title, owner: { connect: $owner } }) {
          _id
          title
        }
      }
    `;

    try {
      await graphQLClient(token).request(query, {
        title: values.title,
        owner: user.id,
      });
      updateRoutines();
    } catch (error) {
      setCreateError(error.message);
    }
  };

  return (
    <Modal title="Create a new routine" onClose={onClose}>
      <Formik
        initialValues={{ title: '' }}
        validationSchema={RoutineSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleCreateRoutine(values).then(() => {
            setSubmitting(false);
            onClose();
          });
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <InputContainer>
              <Input label="Title *" type="title" name="title" />
              <StyledErrorMessage name="title" component="div" />
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

export default CreateRoutineModal;
