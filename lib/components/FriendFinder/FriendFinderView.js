import React  from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  FlatList
} from 'react-native'

class Cell extends React.Component {
  handleItemTapped = () => {
    this.props.handleItemTapped(this.props.friend)
  }

  render = () => {
    const { friend } = this.props
    return (
      <View>
        <TouchableHighlight underlayColor='#e2e2e2' onPress={this.handleItemTapped} style={styles.cell}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image source={{uri: friend.picture.data.url}} style={styles.imageView} />
            <Text>{friend.name}</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

export default class FriendFinderView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { friends: [] }
  }

  componentDidMount() {
    this.props.fetchFriends(this.props.accessToken)
  }

  queryChanged = value => {
    const query = value.toLowerCase()
    if (query.trim() === '') {
      this.setState({ friends: [] })
      return
    }

    const friends = this.props.friends.filter(friend => {
      return friend.name.toLowerCase().startsWith(query)
    })
    this.setState({ friends: friends })
  }

  handleClick = friend => {
    this.props.onFriendSelected(friend)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TextInput
          style={styles.input}
          onChangeText={this.queryChanged}
          placeholder="Search..."
        />
        <FlatList
          data={this.state.friends}
          renderItem={ ({item, index, section}) => (
            <Cell friend={item} handleItemTapped={this.handleClick}/>
          )}
          keyExtractor={ (_, index) => index }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageView: {
    width: 46,
    height:46,
    marginRight: 10,
    borderRadius: 23
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
    height: 40,
    borderColor: '#e2e2e2',
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    marginLeft: 15,
    marginRight: 15
  },
  cell: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10
  },
})
