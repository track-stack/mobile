import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider, connect } from 'react-redux'
import { store, actions } from 'trackstack'
import { AppLoading } from 'expo'
import BaseViewContainer from './lib/components/Base/BaseViewContainer'

const { setAccessToken } = actions.Site

import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

const AppNavigator = StackNavigator({
  Base: BaseViewContainer
});
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Base'))
const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)
  return nextState || state
}

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
)
const addListener = createReduxBoundAddListener("root")

class AppView extends React.Component {
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
    console.log(this.props)
    if (this.props.accessToken || this.state.attemptedToFetchToken) {
      return <AppNavigator navigation={addNavigationHelpers({
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

const mapStateToProps = state => {
  return {
    accessToken: state.main.accessToken,
    nav: state.nav
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

const finalStore = store({ reducers: {nav: navReducer},middleware: [middleware] })
export default class App extends React.Component {
  render() {
    return (
      <Provider store={finalStore}>
        <ConnectedComponent />
      </Provider>
    )
  }
}
