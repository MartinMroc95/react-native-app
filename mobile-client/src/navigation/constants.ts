export enum Routes {
  Home = 'Home',
  SignIn = 'Sign In',
  SignUp = 'Sign Up',
  ForgotPassword = 'Forgot Password',
}

export type UnAuthStackParamList = {
  [Routes.SignIn]: undefined
  [Routes.SignUp]: undefined
  [Routes.ForgotPassword]: undefined
}
