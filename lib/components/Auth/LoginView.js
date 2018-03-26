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

    this.handleButtonPress = this.handleButtonPress.bind(this)
  }

  async handleButtonPress() {
    // appId = "127379194582876"
    // const { type, expires, token } = await Expo.Facebook.logInWithReadPermissionsAsync(appId, {
    //   permissions: ["email", "user_friends"]
    // })
    const expires = 1534567768
    const token = "EAABz2celF1wBABNcgIFTcZBsHSSbf3KPdXfn52AWbcJZC2ZBRZCYsDuT44tHbvMESZCBAelOgJWA2HsfguG3IXsustCJ1bgXebsILxjj4nl0jILui09dYk7bvbQ9ioLmFXlkcz3Aersurls8EDQciIEh0CirphwkIbZCmYS3P0lTEXfP49F3WHZAsVHwWE8wIaGbgwdWDYuZA2pZBRkBHnzEq"

    this.props.login(token, expires).then(response => {
      return response.json()
    }).then(json => {
      Expo.SecureStore.setItemAsync('ts_access_token', json.access_token, null)
      this.props.onLoginHandler(json.user)
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
