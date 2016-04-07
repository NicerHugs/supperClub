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
  ToolbarAndroid,
} from 'react-native';
import SelectContacts from './components/selectContacts';
import SelectDate from './components/datePicker';

var sms = React.NativeModules.SmsModule;

class mobile extends Component {
  constructor() {
    super();
    this.state = {
      number: '',
      startDate: new Date(),
      endDate: new Date()
    }
    this.setDate = this.setDate.bind(this);
  }
  send(num) {
    var textBody = 'hi from supper club';
    sms.send(num, textBody, function(s) {
      console.log('success', s)
    }, function(e) {
      console.log('error', e)
    });
  }
  setDate(stateKey, date) {
    let newState = {};
    newState[stateKey] = date;
    this.setState(newState);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'pink'}
          barStyle="light-content" />
        <View style={styles.toolbar}>
          <TextInput
            style={styles.toolbarTitle}
            placeholder="Event Name"/>
          <TouchableOpacity style={styles.toolbarButton}>
            <Text style={styles.toolbarButtonText}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainArea}>
          <SelectDate
            stateKey="startDate"
            minDate={new Date()}
            date={this.state.startDate}
            handleDate={this.setDate}/>
          <SelectDate
            stateKey="endDate"
            minDate={this.state.startDate}
            date={this.state.endDate < this.state.startDate ? this.state.startDate : this.state.endDate}
            handleDate={this.setDate}/>
          <SelectContacts />
        </View>
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
    backgroundColor: 'turquoise',
    flexDirection: 'row',
    height: 70
  },
  toolbarButton: {
    width: 50,
    justifyContent: 'flex-start',
    paddingRight: 15,
    paddingTop: 15
  },
  toolbarButtonText: {
    textAlign: 'right',
    fontSize: 15
  },
  toolbarTitle: {
    flex: 1,
    paddingLeft: 15,
    fontSize: 20
  },
  mainArea: {
    flex: 1,
  },
  msgInput: {
    height: 40,
    borderColor: 'gray',
    borderStyle: 'solid',
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
