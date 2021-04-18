import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Form, Formik } from 'formik';
import { Button, Input, LoginLayout } from '../components';
import * as Yup from 'yup';
import {
  FormFooter,
  StyledErrorMessage,
  InputContainer,
  Error,
} from '../components/Layout/LoginLayout';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values) => {
    if (errorMessage) setErrorMessage('');

    try {
      setLoading(true);
      const res = await fetch('/api/login', {
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
            <InputContainer>
              <Input label="Email *" type="email" name="email" />
              <StyledErrorMessage name="email" component="div" />
            </InputContainer>
            <InputContainer>
              <Input label="Password *" type="password" name="password" />
              <StyledErrorMessage name="password" component="div" />
            </InputContainer>
            <FormFooter>
              <p>
                Don't have an account? <Link href={'/signup'}>Sign up</Link>
              </p>
              <Button loading={loading} type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </FormFooter>
          </Form>
        )}
      />
      {errorMessage && <Error>{errorMessage}</Error>}
    </LoginLayout>
  );
};

export default LoginPage;
