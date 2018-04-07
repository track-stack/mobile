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
    const turn = item.viewersTurn ? "your" : "their"
    const name = item.opponent.name
    const formattedName = name.length > 20 ? name.substr(0, 20) + "..." : name
    return (
      <View>
        <TouchableHighlight underlayColor='#e2e2e2' onPress={this.handleItemTapped} style={styles.cell}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.imageView}
              source={{uri: item.opponent.image}}
            />
            <Text>{formattedName}</Text>
            <Text> ({turn} turn)</Text>
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
      headerLeft: (
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
    backgroundColor: 'white'
  },
  cell: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  imageView: {
    width: 46,
    height:46,
    marginRight: 10,
    borderRadius: 23
  }
})
