import React from 'react'
import {
  View,
  Button,
  Text,
  StyleSheet
 } from 'react-native'
import { staging } from '../utils/config'
const { facebookAppId } = staging

export default class LoginView extends React.Component {
  static navigationOptions = {
    title: "Log in"
  }

  constructor(props) {
    super(props)

    this.handleButtonPress = this.handleButtonPress.bind(this)
  }

  async handleButtonPress() {
    const { type, expires, token } = await Expo.Facebook.logInWithReadPermissionsAsync(facebookAppId, {
      permissions: ["email", "user_friends"]
    })

    this.props.login(token, expires).then(response => {
      return response.json()
    }).then(json => {
      Expo.SecureStore.setItemAsync('ts_access_token', json.access_token, null).then(() => {
        this.props.navigation.navigate('App')
      })
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.button}
          color='#000'
          title='Log in'
          onPress={this.handleButtonPress} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    color: '#fff',
    flex: 1,
    padding: 10,
    backgroundColor: 'purple',
    width: 100,
    height: 100,
  }
})
