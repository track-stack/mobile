import { StackNavigator } from 'react-navigation'
import DashboardViewContainer from '../Dashboard/DashboardViewContainer'
import GameViewContainer from '../Game/GameViewContainer'
import CreateGameViewContainer from '../CreateGame/CreateGameViewContainer'

const AppNavigator = StackNavigator(
  {
    Dashboard: DashboardViewContainer,
    Game: GameViewContainer,
    CreateGame: CreateGameViewContainer
  },
  {
    initialRouteName: 'Dashboard'
  }
)

export default AppNavigator
