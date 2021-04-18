import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import { Button, Input, LoginLayout } from '../components';
import {
  FormFooter,
  StyledErrorMessage,
  InputContainer,
  Error,
} from '../components/Layout/LoginLayout';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignupPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values) => {
    if (errorMessage) setErrorMessage('');

    try {
      setLoading(true);
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setLoading(false);
        router.push('/');
      } else {
        setLoading(false);
        res.text().then((text) => {
          setErrorMessage(text);
        });
      }
    } catch (error) {
      console.error(error);
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
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            handleSubmit(values);
            setSubmitting(false);
          }}
          render={({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <InputContainer>
                <Input label="Email" type="email" name="email" />
                <StyledErrorMessage name="email" component="div" />
              </InputContainer>
              <InputContainer>
                <Input label="Password" type="password" name="password" />
                <StyledErrorMessage name="password" component="div" />
              </InputContainer>
              <FormFooter>
                <p>
                  Already have an account? <Link href={'/login'}>Login</Link>
                </p>
                <Button loading={loading} type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </FormFooter>
            </Form>
          )}
        />
      </div>
      {errorMessage && <Error>{errorMessage}</Error>}
    </LoginLayout>
  );
};

export default SignupPage;
