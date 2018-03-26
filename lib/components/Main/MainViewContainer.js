import React from 'react'
import { connect } from 'react-redux'
import MainView from './MainView'

const mapDispatchToProps = dispatch => {
  return {}
}

const mapStateToProps = state => {
  return {}
}

const MainViewContainer = connect(
  mapStateToProps, mapDispatchToProps
)(MainView)

export default MainViewContainer
