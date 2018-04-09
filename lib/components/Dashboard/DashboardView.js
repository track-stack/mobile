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
  handleItemTapped = () => {
    this.props.handleItemTapped(this.props.item)
  }

  render = () => {
    const item = this.props.item
    const turn = item.viewersTurn ? "your" : "their"
    const name = item.opponent.name
    const formattedName = name.length > 20 ? name.substr(0, 20) + "..." : name
    const alpha = item.viewersTurn ? 1 : 0.5

    return (
      <View>
        <TouchableHighlight underlayColor='#e2e2e2' onPress={this.handleItemTapped} style={[styles.cell, {opacity: alpha}]}>
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

    this.state = { refreshing: false }
  }

  componentWillMount = () => {
    this.props.navigation.setParams({ logout: this.logout })
  }

  componentDidMount = () => {
    const { fetchDashboard, accessToken, navigation } = this.props
    fetchDashboard(accessToken)
    navigation.addListener('willFocus', event => {
      fetchDashboard(accessToken)
    });
  }

  logout = () => {
    Expo.SecureStore.deleteItemAsync('ts_access_token', null).then(() => {
      this.props.navigation.navigate('Auth')
    })
  }

  handleItemTapped = (item) => {
    this.props.navigation.navigate('Game', { gameId: item.gameId })
  }

  render = () => {
    const previews = this.props.dashboard.previews
    return (
      <View style={styles.container}>
        <FlatList
          data={previews}
          renderItem={ ({item}) => (
            <Cell item={item} handleItemTapped={this.handleItemTapped}/>
          )}
          keyExtractor={ (_, index) => index }
          refreshing={this.state.refreshing}
          onRefresh={ () => {
            console.log('refreshing')
            this.setState({refreshing: true})
            setTimeout(() => {this.setState({ refreshing: false})}, 1000)
          }}
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
    paddingBottom: 10
  },
  imageView: {
    width: 46,
    height:46,
    marginRight: 10,
    borderRadius: 23
  }
})
