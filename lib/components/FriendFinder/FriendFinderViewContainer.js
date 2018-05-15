import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'trackstack';
import FriendFinderView from './FriendFinderView';

const { fetchFriends } = actions.api;

const mapStateToProps = (state) => {
  return {
    friends: state.main.friends,
    accessToken: state.main.accessToken
  };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    ...props,
    fetchFriends: token => {
      dispatch(fetchFriends(token))
    },
  }
}

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendFinderView)

export default class FriendFinderViewContainer extends React.Component {
  render() {
    return (
      <ConnectedComponent {...this.props}/>
    )
  }
}
