import React from 'react'
import {
  Text,
  View
} from 'react-native'

export default class CreateGameView extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'New Game'
    }
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Poop</Text>
      </View>
    )
  }
}
