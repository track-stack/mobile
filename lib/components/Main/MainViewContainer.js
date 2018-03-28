import React from 'react'
import { connect } from 'react-redux'
import { actions } from 'trackstack'
import MainView from './MainView'

const { setAccessToken } = actions.Site

const mapDispatchToProps = dispatch => {
  return {
    setAccessToken: () => {
      dispatch(setAccessToken(null))
    }
  }
}

const mapStateToProps = state => {
  return {}
}

const MainViewContainer = connect(
  mapStateToProps, mapDispatchToProps
)(MainView)

export default MainViewContainer
