import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import BaseNavigator from '../Navigators/BaseNavigator'
import {
  createReduxBoundAddListener
} from 'react-navigation-redux-helpers';

export default class AppView extends React.Component {
  addListener = createReduxBoundAddListener("root")

  render = () => {
    const addListener = this.addListener
    return (
      <BaseNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener
      })} />
    )
  }
}
