import * as yup from 'yup'

export const forgotPasswordValidationScheme = yup
  .object({
    email: yup
      .string()
      .email('Email must be a valid email.')
      .required('Email is a required field.'),
  })
  .required()

export const defaultSignInFormValues = {
  email: '',
}
