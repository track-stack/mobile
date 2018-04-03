import { StackNavigator } from 'react-navigation'
import DashboardViewContainer from '../Dashboard/DashboardViewContainer'

const AppNavigator = StackNavigator({
  Dashboard: DashboardViewContainer
})

export default AppNavigator
