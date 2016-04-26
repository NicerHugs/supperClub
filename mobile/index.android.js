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
import user from './models/user.js';
import evt from './models/event.js';

var sms = React.NativeModules.SmsModule;

class mobile extends Component {
  constructor() {
    super();
    var date = new Date();
    var mins = date.getMinutes();
    if (mins !== 0 || mins !== 5) {
      mins = mins + (5-mins%5);
    }
    if (mins === 60) {
      mins = 0;
      date.setHours(date.getHours() + 1);
    }
    date.setMinutes(mins);
    this.state = {
      title: '',
      startDate: new Date(date),
      endDate: new Date(date),
      guests: []
    }
    this.setDate = this.setDate.bind(this);
    this.sendInvites = this.sendInvites.bind(this);
    this.updateGuests = this.updateGuests.bind(this);
    this.removeGuest = this.removeGuest.bind(this);
  }

  componentDidMount() {
    user.fetch()
    .then(user => this.setState({user: user}))
    .catch(error => console.log(error));
  }

  sendInvites() {
    evt.create(this.state)
    .then()
    .catch(console.log.bind(console));
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
  updateGuests(guest) {
    this.setState({guests: this.state.guests.concat([guest])});
  }
  removeGuest(guest) {
    this.setState({
      guests: this.state.guests.filter((a)=>{return a.recordID !== guest.recordID})
    });
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
            placeholder="Event Name"
            value={this.state.title}
            onChangeText={title => this.setState({title})}/>
          <TouchableOpacity style={styles.toolbarButton}>
            <Text style={styles.toolbarButtonText}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainArea}>
          <View style={styles.dateArea}>
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
          </View>
          <SelectContacts
            style={styles.contactArea}
            selectedContacts={this.state.guests}
            contactSelected={this.updateGuests}
            contactRemoved={this.removeGuest}/>
          <TextInput
            multiline={true}
            placeholder="Event Description"
            />
        </View>
        <TouchableOpacity style={styles.sendBtn} onPress={() => this.sendInvites()}>
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
    flexDirection: 'column'
  },
  dateArea: {
    flex: 2
  },
  contactArea: {
    flex: 2
  },
  description: {
    flex: 1
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
