import { connect } from 'react-redux'
import DashboardView from './DashboardView.js'
import { actions } from 'trackstack'

const { fetchDashboard } = actions.api

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDashboard: (token) => {
      return dispatch(fetchDashboard(token))
    }
  }
}

const mapStateToProps = state => {
  return {
    dashboard: state.main.dashboard
  }
}

const DashboardViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardView)

export default DashboardViewContainer
