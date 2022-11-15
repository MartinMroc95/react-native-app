export enum Routes {
  Home = 'Home',
  SignIn = 'Sign In',
  SignUp = 'Sign Up',
}

export type UnAuthStackParamList = {
  [Routes.SignIn]: undefined
  [Routes.SignUp]: undefined
}
