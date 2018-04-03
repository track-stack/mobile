import { connect } from 'react-redux'
import AppView from './AppView'
import { actions } from 'trackstack'

const { setAccessToken } = actions.Site

const mapStateToProps = state => {
  return {
    nav: state.nav
  }
}

const ConnectedComponent = connect(
  mapStateToProps
)(AppView)

export default ConnectedComponent
