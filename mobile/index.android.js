/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import SelectContacts from './components/selectContacts';

var sms = React.NativeModules.SmsModule;

class mobile extends Component {
  constructor() {
    super();
    this.state = {
      number: ''
    }
  }
  send(num) {
    sms.send(num, 'hi from supper club', function(s) {
      console.log('success', s)
    }, function(e) {
      console.log('error', e)
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <SelectContacts />
        <TextInput
          keyboardType='numeric'
          style={styles.msgInput}
          onChangeText={(number) => this.setState({number})}
          value={this.state.number} />
        <TouchableOpacity style={styles.btn} onPress={() => this.send(this.state.number)}>
          <Text style={styles.btn_txt}>Send sms</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  msgInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  btn: {
  },
  btn_txt: {
    color: 'pink'
  }
});

AppRegistry.registerComponent('mobile', () => mobile);
