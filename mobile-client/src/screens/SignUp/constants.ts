import * as yup from 'yup'

export const signUpValidationScheme = yup
  .object({
    email: yup
      .string()
      .email('Email must be a valid email.')
      .required('Email is a required field.'),
    password: yup.string().required('Password is a required field.'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], "Passwords don't match.")
      .required('Confirm Password is a required field.'),
  })
  .required()

export const defaultSignUpFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
}
