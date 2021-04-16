import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, Input, LoginLayout } from '../components';
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

const SignupPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (values) => {
    if (errorMessage) setErrorMessage('');

    try {
      const res = await fetch('/api/signup', {
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
      <Head>
        <title>Signup | BabyDo</title>
      </Head>
      <div>
        <h1>Signup</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
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
                  Already have an account? <Link href={'/login'}>Login</Link>
                </p>
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </FormFooter>
            </Form>
          )}
        />
      </div>
    </LoginLayout>
  );
};

export default SignupPage;
