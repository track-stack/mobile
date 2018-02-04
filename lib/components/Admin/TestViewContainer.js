import React from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { store, actions } from 'trackstack'
import TestView from './TestView'

const {reset, submitAnswer} = actions.Admin;

const mapStateToProps = state => {
  return {
    steps: state.admin.steps
  }
}

const mapDispatchToProps = dispatch => {
  return {
    reset: () => {
      dispatch(reset())
    },
    submitAnswer: (answer) => {
      dispatch(submitAnswer(answer))
    },
  }
}

const ConnectedComponent = connect(
  mapStateToProps, mapDispatchToProps
)(TestView)

export default class TestViewContainer extends React.Component {
  render() {
    return <ConnectedComponent />
  }
}