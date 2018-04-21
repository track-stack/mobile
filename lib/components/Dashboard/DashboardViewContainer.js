import { connect } from 'react-redux'
import DashboardView from './DashboardView.js'
import { actions } from 'trackstack'

const { fetchDashboard, postNotificationsToken } = actions.api

const mapDispatchToProps = dispatch => {
  return {
    fetchDashboard: token => dispatch(fetchDashboard(token)),
    postNotificationsToken: (accessToken, expoToken, deviceId) => {
      dispatch(postNotificationsToken(accessToken, expoToken, deviceId))
    }
  }
}

const mapStateToProps = state => {
  return {
    dashboard: state.main.dashboard,
    accessToken: state.main.accessToken
  }
}

const DashboardViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardView)

export default DashboardViewContainer
