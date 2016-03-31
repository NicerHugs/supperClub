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
    var textBody = 'hi from supper club';
    sms.send(num, textBody, function(s) {
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
