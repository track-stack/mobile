import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

export default class MainView extends React.Component {
  constructor(props) {
    super(props)

    this.logOutTapped = this.logOutTapped.bind(this)
  }

  logOutTapped() {
    Expo.SecureStore.deleteItemAsync('ts_access_token', null)
    this.props.setAccessToken()
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Hola! Welcome to Track Strack 🎶</Text>
        <TouchableHighlight
         onPress={this.logOutTapped}
        >
         <Text> Touch Here </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

