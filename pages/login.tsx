import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, Input, LoginLayout } from '../components';
import * as Yup from 'yup';
import styled from 'styled-components';

const FormFooter = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  p {
    margin: 0;
  }
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (values) => {
    if (errorMessage) setErrorMessage('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <LoginLayout>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
        render={({ isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Input label="Email" type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Input label="Password" type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <FormFooter>
              <p>
                Don't have an account? <Link href={'/signup'}>Sign up</Link>
              </p>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </FormFooter>
          </Form>
        )}
      />
    </LoginLayout>
  );
};

export default LoginPage;
