import React from 'react'
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView,
  StyleSheet 
} from 'react-native'
import AttributedText from '../AttributedText'

export default class TestView extends React.Component {

  constructor(props) {
    super(props)

    this.answer = ""

    this.handleInputChanged = this.handleInputChanged.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChanged(e) {
    this.answer = e.nativeEvent.text
  }

  handleSubmit() {
    this.props.reset()
    this.props.submitAnswer(this.answer)

    this.answer = ""
    this.refs.answerField.clear()
  }

  render() {
    const steps = this.props.steps.map((step, idx) => {
      return <AttributedText key={idx} text={step.key} attributes={step.options} />
    })

    return (
      <View style={{flex: 1, padding: 0, paddingTop: 35}}>
        <TextInput 
          ref="answerField"
          style={styles.input} 
          onChange={this.handleInputChanged} 
          onSubmitEditing={this.handleSubmit}
          autoCorrect={false}
        />
        <ScrollView style={styles.scrollView}>
          {steps}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    height: 44,
    borderColor: "#e2e2e2",
    borderWidth: 1
  },

  scrollView: {
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    flex: 1
  }
})