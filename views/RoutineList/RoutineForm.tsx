import React from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Modal from '../../components/Modal';
import {
  InputContainer,
  StyledErrorMessage,
} from '../../components/Layout/LoginLayout';
import { Button, Input } from '../../components';
import { ModalFormFooter } from '../../components/Modal/Modal';

const RoutineSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
});


const RoutineForm = (props) => {
  const { title, onClose, onSubmit, error, buttonText, initialValues } = props;
  return (
    <Modal title={title} onClose={onClose}>
      <Formik
        initialValues={initialValues || { title: '' }}
        validationSchema={RoutineSchema}
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

export default RoutineForm;
