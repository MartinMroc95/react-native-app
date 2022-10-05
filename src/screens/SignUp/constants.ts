import { StyleSheet } from 'react-native'
import * as yup from 'yup'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  control: {
    width: 200,
    maxHeight: 60,
    marginTop: 10,
  },
  error: {
    color: 'red',
  },
})

export const signUpValidationScheme = yup
  .object({
    email: yup
      .string()
      .email('Email must be a valid email.')
      .required('Email is a required field.'),
    password: yup.string().required('Password is a required field.'),
  })
  .required()
