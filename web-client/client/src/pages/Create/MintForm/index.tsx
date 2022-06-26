import React from 'react';
import { Formik, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { mintTopLevelSoftware } from './../../../state/mintTopLevelSoftware';

import { StyledField, Error, Label } from './Formik';
import { Button } from './Button';

interface Values {
  name: string;
  imageurl: string;
}

interface Props {
  address: string;
  royaltyContractInstance: any;
}

const initialValues: Values = {
  name: '',
  imageurl: ''
};

const validationSchema = Yup.object({
  name: Yup.string().required('please enter your project name'),
  imageurl: Yup.string().required('please enter your image url')
});

export default ({address, royaltyContractInstance}: Props) => {
  const onSubmit = async (values: Values, actions: FormikHelpers<Values>) => {
    const { setSubmitting, resetForm, setStatus } = actions;
    try {
      mintTopLevelSoftware({
        royaltyContractInstance: royaltyContractInstance,
        address: address,
        uri: values.imageurl,
        name: values.name
      })
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
          <Label htmlFor="imageurl">Enter Image URL</Label>
          <StyledField
            type="text"
            id="imageurl"
            name="imageurl"
            placeholder="image url"
          />
          <ErrorMessage name="imageurl" component={Error} />
          {status && status.message && <Error>{status.message}</Error>}
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Mint
          </Button>
        </Form>
      )}
    </Formik>
  );
};
