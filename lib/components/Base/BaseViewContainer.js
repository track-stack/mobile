import React from 'react'
import { connect } from 'react-redux'
import BaseView from './BaseView'

const mapDispatchToProps = dispatch => {
  return {}
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
