import React, { Component } from 'react'
import { FlatList, View, Image, Text, StyleSheet } from 'react-native'

class TurnListCell extends React.Component {
  render() {
    const turn = this.props.turn
    const match = turn.match
    const answer = turn.answer
    const hasNameMatch = turn.hasExactNameMatch
    const hasArtistMatch = turn.hasExactArtistMatch
    const nameColor = hasNameMatch ? "green" : "red"
    const artistColor = hasArtistMatch ? "green" : "red"
    return (
      <View style={styles.container}>
        <Image source={{uri: turn.userPhoto}} style={styles.image} />
        <View style={{flex: 1}}>
          <Text style={styles.song}>
            {match.name} - {match.artist}
          </Text>
          <Text style={styles.small}>
            [input: {turn.answer}]
          </Text>
          <Text style={styles.small}>
            [Name match?: <Text style={{color: nameColor}}>{hasNameMatch.toString()}</Text>,
              Artist match?: <Text style={{color: artistColor}}>{hasArtistMatch.toString()}</Text>]
          </Text>
        </View>
      </View>
    )
  }
}

export default class TurnsListView extends React.Component {
  render() {
    const turns = this.props.turns
    return (
      <FlatList
        data={turns}
        renderItem={ ({item}) => (
          <TurnListCell turn={item}/>
        )}
        keyExtractor={ (_, index) => index }
        ListFooterComponent={<View style={{height: 30}} />}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20
  },
  image: {
    width: 46,
    height: 46,
    marginRight: 15,
    borderRadius: 23
  },
  song: {
    marginBottom: 6,
    fontWeight: 'bold'
  },
  small: {
    fontSize: 12
  }
})
