import React from 'react';
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { StyledField, Error, Label } from './Formik';
import { Button } from './Button';

interface Values {
  first_name: string;
  last_name: string;
  email: string;
}

const initialValues: Values = {
  first_name: '',
  last_name: '',
  email: ''
};

const validationSchema = Yup.object({
  first_name: Yup.string().required('please enter your first name'),
  last_name: Yup.string().required('please enter your last name'),
  email: Yup.string()
    .email('invalid email format')
    .required('please enter your email')
});

const onSubmit = async (values: Values, actions: FormikHelpers<Values>) => {
  const { setSubmitting, resetForm, setStatus } = actions;
  try {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    const response = await fetch('https://formspree.io/xrgynron', options);
    if (!response.ok) {
      // LOG setStatus({ message: `${response.status} Error: ${response.statusText}`});
      setStatus({ message: 'Something went wrong, please try again later' });
    } else {
      resetForm();
    }
  } catch (err) {
    // LOG setStatus({ message: `${err.name}: ${err.message}` })
    setStatus({ message: 'Something went wrong, please try again later' });
  } finally {
    setSubmitting(false);
  }
};

export default () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ status, isValid, isSubmitting }) => (
        <Form>
          <Label htmlFor="first_name">Enter First Name</Label>
          <StyledField
            type="text"
            id="first_name"
            name="first_name"
            placeholder="John"
          />
          <ErrorMessage name="first_name" component={Error} />
          <Label htmlFor="last_name">Enter Last Name</Label>
          <StyledField
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Lennon"
          />
          <ErrorMessage name="last_name" component={Error} />
          <Label htmlFor="email">Enter Email</Label>
          <StyledField
            type="email"
            id="email"
            name="email"
            placeholder="john@lennon.com"
          />
          <ErrorMessage name="email" component={Error} />
          {status && status.message && <Error>{status.message}</Error>}
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
