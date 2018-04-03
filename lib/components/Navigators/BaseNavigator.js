import { SwitchNavigator } from 'react-navigation'
import AuthNavigator from './AuthNavigator'
import AppNavigator from './AppNavigator'
import LaunchViewContainer from '../Launch/LaunchViewContainer'

const BaseNavigator = SwitchNavigator({
  Launch: LaunchViewContainer,
  Auth: AuthNavigator,
  App: AppNavigator
})

export default BaseNavigator
