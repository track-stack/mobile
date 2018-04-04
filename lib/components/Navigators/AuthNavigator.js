import { StackNavigator } from 'react-navigation'
import LoginViewContainer from '../Auth/LoginViewContainer'

const AuthNavigator = StackNavigator({
  Login: LoginViewContainer
})

export default AuthNavigator
