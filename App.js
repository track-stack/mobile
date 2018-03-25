import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider, connect } from 'react-redux'
import { store } from 'trackstack'
import BaseViewContainer from './lib/components/Base/BaseViewContainer'

class AppView  extends React.Component {
  render() {
    return <BaseViewContainer />
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
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
