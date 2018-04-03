import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { AppLoading } from 'expo'
import BaseNavigator from '../Navigators/BaseNavigator'
import {
  createReduxBoundAddListener
} from 'react-navigation-redux-helpers';

export default class AppView extends React.Component {
  state = { attemptedToFetchToken: false }
  addListener = createReduxBoundAddListener("root")

  constructor(props) {
    super(props)
    console.log(props)

    this.fetchTokenFromKeychain = this.fetchTokenFromKeychain.bind(this)
  }

  async fetchTokenFromKeychain() {
    return Expo.SecureStore.getItemAsync('ts_access_token', null).then(token => {
      if (token) {
        this.props.setAccessToken(token)
      } else {
        this.setState({ attemptedToFetchToken: true })
      }
    })
  }

  render() {
    const addListener = this.addListener
    if (this.props.accessToken || this.state.attemptedToFetchToken) {
      return <BaseNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener
      })} />
    } else {
      return (
        <AppLoading
          startAsync={this.fetchTokenFromKeychain}
          onFinish={() => {}}
          onError={console.warn}
        />
      )
    }
  }
}
