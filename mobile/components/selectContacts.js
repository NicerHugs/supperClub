import React, {
  Component,
  StyleSheet,
  TextInput,
  Text,
  View,
  ListView,
  TouchableOpacity
} from 'react-native';

var contacts = React.NativeModules.ContactsModule;

class selectContacts extends Component {
  constructor() {
    super();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.updateSearch = this.updateSearch.bind(this);
    this.handleContacts = this.handleContacts.bind(this);
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }
  render() {
    return (
      <View>
        <Text>Guests</Text>
        <TextInput onChangeText={this.updateSearch}/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={renderContact}
        />
      </View>
    )
  }
  handleContacts(err, contacts) {
    if (err) {return err;}
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(contacts.filter(contact => {
        return contact.hasPhoneNumber;
      }))
    });
  }
  updateSearch(text) {
    if (text.trim()) {
      contacts.search(text, this.handleContacts)
    } else {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows([])
      });
    }
  }
}

function renderContact(rowData) {
  return (
    <Text>{rowData.displayName}</Text>
  )
}

export default selectContacts;
