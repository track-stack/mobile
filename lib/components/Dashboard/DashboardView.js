import React, { Component } from 'react'
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Image,
  Button,
  TouchableHighlight
} from 'react-native'
import NotificationManager from '../utils/NotificationManager'

class Cell extends React.Component {
  handleItemTapped = () => {
    this.props.handleItemTapped(this.props.item)
  }

  render = () => {
    const item = this.props.item
    const name = item.opponent.name
    const formattedName = name.length > 20 ? name.substr(0, 20) + "..." : name
    const alpha = item.viewersTurn ? 1 : 0.8

    return (
      <View>
        <TouchableHighlight underlayColor='#e2e2e2' onPress={this.handleItemTapped} style={[styles.cell, {opacity: alpha}]}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.imageView}
              source={{uri: item.opponent.image}}
            />
            <Text>{formattedName}</Text>
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
      headerBackTitle: null,
      headerLeft: (
        <Button onPress={params.logout} title="Log out" />
      ),
      headerRight: (
        <Button onPress={() => { navigation.navigate('CreateGame')}} title="+" />
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

    if (accessToken) {
      fetchDashboard(accessToken)
    } else {
      Expo.SecureStore.getItemAsync('ts_access_token', null).then(token => {
        if (token) { fetchDashboard(token) }
      })
    }

    navigation.addListener('willFocus', event => {
      fetchDashboard(accessToken)
    });

    NotificationManager.registerNotifications().then(token => {
      const deviceId = Expo.Constants.deviceId
      this.props.postNotificationsToken(this.props.accessToken, token, deviceId)
    })
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
    let tableData = []
    for (const key in previews) {
      const data = {}
      data.title = key.toUpperCase()
      data.data = previews[key]
      tableData.push(data)
    }
    tableData = tableData.sort((left, right) => {
      return left.title < right.title
    })
    return (
      <View style={styles.container}>
        <SectionList
          renderItem={ ({item, index, section}) => (
            <Cell item={item} handleItemTapped={this.handleItemTapped}/>
          )}
          renderSectionHeader={ ({section: {title}}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
            </View>
          )}
          sections={tableData}
          keyExtractor={ (_, index) => index }
          refreshing={this.state.refreshing}
          onRefresh={ () => {
            this.setState({refreshing: true})
            setTimeout(() => {
              this.props.fetchDashboard(this.props.accessToken).then(() => {
                this.setState({refreshing: false})
              })
            })
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
  },
  sectionHeader: {
    flex: 1,
    justifyContent: 'center',
    height: 34,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#f7f7f7'
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 12
  }
})
