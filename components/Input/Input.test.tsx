import React from 'react';
import Input from './Input';
import { fireEvent, getByLabelText, render } from '@testing-library/react';
import { Formik } from 'formik';

describe('Input component', () => {
  it('should render a label', () => {
    const handleSubmit = jest.fn();
    const { getByLabelText } = render(
      <Formik initialValues={{ email: '' }} onSubmit={handleSubmit}>
        <Input name="email" label="Email" />
      </Formik>
    );
    getByLabelText('Email');
  });

  it('should change after user input', () => {
    const handleSubmit = jest.fn();
    const { getByLabelText } = render(
      <Formik initialValues={{ name: '' }} onSubmit={handleSubmit}>
        <Input name="name" label="Name" />
      </Formik>
    );
    const input = getByLabelText('Name');

    fireEvent.change(input, { target: { value: 'Ricardo' } });
    /* @ts-ignore disable-next-line */
    expect(input.value).toBe('Ricardo');
  });
});
