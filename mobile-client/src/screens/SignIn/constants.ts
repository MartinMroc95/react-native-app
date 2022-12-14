import * as yup from 'yup'

export const signInValidationScheme = yup
  .object({
    email: yup
      .string()
      .email('Email must be a valid email.')
      .required('Email is a required field.'),
    password: yup.string().required('Password is a required field.'),
  })
  .required()

export const defaultSignInFormValues = {
  email: '',
  password: '',
}
