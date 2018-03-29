import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image
} from 'react-native'

class Cell extends React.Component {
  render() {
    return (
      <View style={styles.cell}>
        {this.props.children}
      </View>
    )
  }
}

export default class DashboardView extends React.Component {
  componentDidMount() {
    Expo.SecureStore.getItemAsync('ts_access_token', null).then(token => {
      this.props.fetchDashboard(token)
    }).catch(error => {
      console.log('huh')
    })
  }

  render() {
    const previews = this.props.dashboard.previews
    return (
      <View style={styles.container}>
        <FlatList
          data={previews}
          renderItem={ ({item}) => (
            <Cell>
              <Image
                style={styles.imageView}
                source={{uri: item.opponent.image}}
              />
              <Text>{item.opponent.name}</Text>
            </Cell>
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
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15
  },
  cell: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center'
  },
  imageView: {
    width: 40,
    height:40,
    marginRight: 10
  }
})
