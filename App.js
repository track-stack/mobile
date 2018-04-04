import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider, connect } from 'react-redux'
import { store } from 'trackstack'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import AppViewContainer from './lib/components/App/AppViewContainer'
import BaseNavigator from './lib/components/Navigators/BaseNavigator'

const initialState = BaseNavigator.router.getStateForAction(BaseNavigator.router.getActionForPathAndParams('Launch'))
const navReducer = (state = initialState, action) => {
  const nextState = BaseNavigator.router.getStateForAction(action, state)
  return nextState || state
}

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
)
const finalStore = store({
  reducers: {nav: navReducer},
  middleware: [middleware]
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={finalStore}>
        <AppViewContainer />
      </Provider>
    )
  }
}
