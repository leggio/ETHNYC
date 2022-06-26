import React from 'react';
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
// import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
// import { v4 as uuidv4 } from 'uuid';

import { StyledField, Error, Label } from './Formik';
import { Button } from './Button';

interface Values {
  name: string;
  imageUrl: string;
}

const initialValues: Values = {
  name: '',
  imageUrl: ''
};

const validationSchema = Yup.object({
  name: Yup.string().required('please enter your project name'),
  imageUrl: Yup.string().required('please enter your image url')
});

export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onSubmit = async (values: Values, actions: FormikHelpers<Values>) => {
    const { setSubmitting, resetForm, setStatus } = actions;
    try {
      // const token = 'daf';
      // const authInterceptor = new AuthInterceptor(token);
      // const options = {
      //   unaryInterceptors: [authInterceptor]
      // };
      // const service = new GrpcServicePromiseClient(host, null, options);
    } catch (err) {
      // LOG setStatus({ message: `${err.name}: ${err.message}` })
      setStatus({ message: 'Something went wrong, please try again later' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ status, isValid, isSubmitting }) => (
        <Form>
          <Label htmlFor="name">Enter Name</Label>
          <StyledField
            type="text"
            id="name"
            name="name"
            placeholder="project name"
          />
          <ErrorMessage name="name" component={Error} />
          <Label htmlFor="image">Enter Image URL</Label>
          <StyledField
            type="text"
            id="image"
            name="image"
            placeholder="image url"
          />
          <ErrorMessage name="image" component={Error} />
          {status && status.message && <Error>{status.message}</Error>}
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Mint
          </Button>
        </Form>
      )}
    </Formik>
  );
};
