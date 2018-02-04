import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class AttributedText extends React.Component {
  constructor(props) {
    super(props)

    this.expandTag = this.expandTag.bind(this)
  }

  expandTag() {
    const input = this.props.text
    const attrs = this.props.attributes

    if (!attrs) { return <Text>{input}</Text> }
    if (!attrs.tags) { return <Text>{input}</Text> }

    const tags = attrs.tags 

    var result = []
    tags.forEach((tag, idx) => {
      if (idx !== 0) {
        const indexOfThisTag = tag.range[0]
        const previousTag = tags[idx - 1]
        const endIndexOfLastTag = previousTag.range[0] + previousTag.range[1]
        if (indexOfThisTag - endIndexOfLastTag > 0) {
          const text = input.substr(endIndexOfLastTag, indexOfThisTag - endIndexOfLastTag)
          result.push((<Text key={`${text}-${idx}`}>{text}</Text>))
        }
      }
  
      const endIndex = tag.range[1] === -1 ? input.length : tag.range[1]
      const text = input.substr(tag.range[0], endIndex)
      const htmlTag = tag.tag
      const style = tag.style || ''

      result.push((<Text key={text} style={[styles[htmlTag], styles[style]]}>{text}</Text>))
    })

    const lastTag = tags[tags.length - 1]
    let lastIndex
    if (lastTag && lastTag.range[1] !== -1 && (lastIndex = lastTag.range[0] + lastTag.range[1]) < input.length) {
      const text = input.substr(lastIndex, input.length)
      result.push((<Text key={text}>{text}</Text>))
    }
    return result 
  }

  render() {
    return (
      <View style={[{paddingLeft: this.props.attributes.indent * 30 }, styles.text]}>
        {this.expandTag()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 20,
    flexDirection: 'row',
    flex: 1
  },

  h3: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  span: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: '#f2f2f2',
    flex: 1,
  },

  success: {
    backgroundColor: 'green',
    color: '#fff'
  },

  input: {
    backgroundColor: '#dbbeea'
  },

  u: {
      textDecorationLine: 'underline'
  },

  i: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#daedfd',
    fontStyle: 'italic'
  },

  b: {
    fontWeight: 'bold'
  }
})