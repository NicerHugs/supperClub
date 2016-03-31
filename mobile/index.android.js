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
  TouchableOpacity,
  StatusBar,
  ToolbarAndroid
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
        <StatusBar
          backgroundColor={'pink'}
          barStyle="light-content" />
        <ToolbarAndroid
          style={styles.toolbar}
          title="Supper Club"
          titleColor={'black'} />
        <SelectContacts />
        <TextInput
          keyboardType='numeric'
          style={styles.msgInput}
          onChangeText={(number) => this.setState({number})}
          value={this.state.number} />
        <TouchableOpacity style={styles.sendBtn} onPress={() => this.send(this.state.number)}>
          <Text style={styles.btn_txt}>Send Invites</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  toolbar: {
    height: 56,
    backgroundColor: 'pink'
  },
  msgInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  sendBtn: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: 'turquoise',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  btn_txt: {
    color: 'white'
  }
});

AppRegistry.registerComponent('mobile', () => mobile);
