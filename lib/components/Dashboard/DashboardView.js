import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Button,
  TouchableHighlight
} from 'react-native'

class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.handleItemTapped = this.handleItemTapped.bind(this)
  }

  handleItemTapped() {
    this.props.handleItemTapped(this.props.item)
  }

  render() {
    const item = this.props.item
    return (
      <View style={styles.cell}>
        <TouchableHighlight onPress={this.handleItemTapped} style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Image
              style={styles.imageView}
              source={{uri: item.opponent.image}}
            />
            <Text>{item.opponent.name}</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

export default class DashboardView extends React.Component {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {}
    params.logout = params.logout || function() {}

    return {
      headerTitle: 'TrackStack',
      headerRight: (
        <Button onPress={params.logout} title="Log out" />
      )
    }
  }

  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.handleItemTapped = this.handleItemTapped.bind(this)
  }

  componentWillMount() {
    this.props.navigation.setParams({ logout: this.logout })
  }

  componentDidMount() {
    Expo.SecureStore.getItemAsync('ts_access_token', null).then(token => {
      this.props.fetchDashboard(token)
    }).catch(error => {
      console.log('DashboardView: Couldn\'t get access token')
    })
  }

  logout() {
    Expo.SecureStore.deleteItemAsync('ts_access_token', null).then(() => {
      this.props.navigation.navigate('Auth')
    })
  }

  handleItemTapped(item) {
    this.props.navigation.navigate('Game', { gameId: item.gameId })
  }

  render() {
    const previews = this.props.dashboard.previews
    return (
      <View style={styles.container}>
        <FlatList
          data={previews}
          renderItem={ ({item}) => (
            <Cell item={item} handleItemTapped={this.handleItemTapped}/>
          )}
          keyExtractor={ (_, index) => index }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },
  cell: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  imageView: {
    width: 46,
    height:46,
    marginRight: 10
  }
})
