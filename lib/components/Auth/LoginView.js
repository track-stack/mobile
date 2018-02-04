import React from 'react'
import { 
  View, 
  Button, 
  Text,
  StyleSheet
 } from 'react-native'

export default class LoginView extends React.Component {
  constructor(props) {
    super(props)
  }

  async handleButtonPress() {
    const appId = '127379194582876'
    console.log(Expo.Facebook.logInWithReadPermissionsAsync)
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
      permissions: ['public_profile', 'email', 'user_friends'],
    })
    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      console.log(response.json())
    }
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