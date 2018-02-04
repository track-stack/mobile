import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider, connect } from 'react-redux'
import { store } from 'trackstack'
import TestViewContainer from './lib/components/Admin/TestViewContainer'
import LoginView from './lib/components/Auth/LoginView'

export default class App extends React.Component {
  render() {
    return <LoginView />
  }
}

// class AppView extends React.Component {
//   render() { 
//     return <TestViewContainer />
//   }
// }
// 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
// 
// 
// const mapStateToProps = state => {
//   return {}
// }
// 
// const mapDispatchToProps = dispatch => {
//   return {}
// }
// 
// const ConnectedComponent = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AppView)

// export default class App extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <ConnectedComponent />
//       </Provider>
//     )
//   }
// }
