import { Form, Formik } from 'formik';
import {
  InputContainer,
  StyledErrorMessage,
} from '../../components/Layout/LoginLayout';
import { Button, Input } from '../../components';
import Modal, { ModalFormFooter } from '../../components/Modal/Modal';
import React from 'react';
import * as Yup from 'yup';

interface TaskForm {
  onSubmit: (values) => Promise<unknown>;
  onClose: () => void;
  error?: string;
  buttonText: string;
  initialValues?: {
    title: string;
    due: string;
  };
}

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  due: Yup.string().required('Required'),
});

const TaskForm = (props: TaskForm) => {
  const { onSubmit, onClose, error, initialValues, buttonText } = props;
  return (
    <Modal title="Create a new task" onClose={onClose}>
      <Formik
        initialValues={initialValues || { title: '', due: '' }}
        validationSchema={TaskSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values).then(() => {
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
                {buttonText}
              </Button>
            </ModalFormFooter>
          </Form>
        )}
      </Formik>
      {error && <p>{error}</p>}
    </Modal>
  );
};

export default TaskForm;
