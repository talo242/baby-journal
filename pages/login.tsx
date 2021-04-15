import { useRouter } from 'next/router'
import { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'

const SignupPage = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (values) => {
    if (errorMessage) setErrorMessage('')

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (res.ok) {
        router.push('/')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error(error)
      setErrorMessage(error.message)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        // validate={(values) => {
        //   const errors = {}
        //
        //   if (!values.title) {
        //     errors.title = 'Required'
        //   }
        //
        //   return errors
        // }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values)
          setSubmitting(false)
          // console.log(values)
          // setTimeout(() => {
          //   // alert(JSON.stringify(values, null, 2))
          //   //
          //   // setSubmitting(false)
          // }, 400)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignupPage
