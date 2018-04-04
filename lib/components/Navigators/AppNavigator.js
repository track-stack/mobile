import { StackNavigator } from 'react-navigation'
import DashboardViewContainer from '../Dashboard/DashboardViewContainer'
import GameViewContainer from '../Game/GameViewContainer'

const AppNavigator = StackNavigator(
  {
    Dashboard: DashboardViewContainer,
    Game: GameViewContainer
  },
  {
    initialRouteName: 'Dashboard'
  }
)

export default AppNavigator
