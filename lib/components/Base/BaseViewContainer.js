import React from 'react'
import { connect } from 'react-redux'
import { actions } from 'trackstack'
import BaseView from './BaseView'

const { setAccessToken } = actions.Site

const mapDispatchToProps = dispatch => {
  return {
    setAccessToken: token => {
      return dispatch(setAccessToken(token))
    }
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.main.accessToken
  }
}
const ConnectedComponent = connect(
  mapStateToProps, mapDispatchToProps
)(BaseView)

export default class BaseViewContainer extends React.Component {
  render(){
    return <ConnectedComponent />
  }
}
