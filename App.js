import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider, connect } from 'react-redux'
import { store, actions } from 'trackstack'
import { AppLoading } from 'expo'
import BaseViewContainer from './lib/components/Base/BaseViewContainer'

const { setAccessToken } = actions.Site

class AppView  extends React.Component {
  state = { attemptedToFetchToken: false }

  constructor(props) {
    super(props)

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
    if (this.props.accessToken || this.state.attemptedToFetchToken) {
      return <BaseViewContainer />
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

const mapStateToProps = state => {
  return {
    accessToken: state.main.accessToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAccessToken: token => {
      return dispatch(setAccessToken(token))
    }
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppView)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedComponent />
      </Provider>
    )
  }
}
