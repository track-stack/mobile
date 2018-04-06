import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

export default class PlayersView extends React.Component {
  render() {
    const players = this.props.players
    return (
      <View style={styles.container}>
        <View style={styles.padding}>
          <Image source={{uri: players.viewer.image}} style={{width: 50, height: 50}} />
          <Text style={styles.score}>{players.viewer.score || 0}</Text>
        </View>
        <Text style={[{marginTop: -20, fontWeight: 'bold'}, styles.padding]}>VS.</Text>
        <View style={styles.padding}>
          <Image source={{uri: players.opponent.image}} style={{width: 50, height: 50}} />
          <Text style={styles.score}>{players.opponent.score || 0}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  padding: {
    marginLeft: 8,
    marginRight: 8
  },
  score: {
    textAlign: 'center',
    marginTop: 10
  }
})
