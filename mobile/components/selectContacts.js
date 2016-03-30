import React, {
  Component,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class selectContacts extends Component {
  updateSearch(text) {
    console.log(text);
  }
  render() {
    return (
      <View>
        <Text>Guests</Text>
        <TextInput onChangeText={this.updateSearch}/>
      </View>
    )
  }
}

export default selectContacts;
