import React, {
  Component,
  StyleSheet,
  TextInput,
  Text,
  View,
  ListView,
  TouchableOpacity
} from 'react-native';
import ContactQuickView from './contactQuickView';

var contacts = React.NativeModules.ContactsModule;

class selectContacts extends Component {
  constructor() {
    super();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.updateSearch = this.updateSearch.bind(this);
    this.handleContacts = this.handleContacts.bind(this);
    this.renderContact = this.renderContact.bind(this);
    this.state = {
      searchTerm: '',
      dataSource: ds.cloneWithRows([]),
      selectedContacts: []
    };
  }
  render() {
    var selected = this.state.selectedContacts.map((contact, i) => {
      return (
        <ContactQuickView contact={contact} key={i} removeContact={() => this.removeContact(contact)}/>
      )
    })
    return (
      <View>
        {selected}
        <TextInput
          value={this.state.searchTerm}
          onChangeText={this.updateSearch}
          placeholder={selected.length ? "" : "Guests"}>
        </TextInput>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderContact}
        />
      </View>
    )
  }
  selectContact(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([]),
      selectedContacts: this.state.selectedContacts.concat([data]),
      searchTerm: ''
    });
  }
  removeContact(contact) {
    this.setState({
      selectedContacts: this.state.selectedContacts.filter((a)=>{return a.recordID !== contact.recordID})
    });
  }
  renderContact(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity
        id={rowData.recordID}
        style={styles.contact}
        onPress={() => this.selectContact(rowData)}>
        <Text>{rowData.displayName}</Text>
      </TouchableOpacity>
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
    this.setState({searchTerm: text})
    if (text.trim()) {
      contacts.search(text, this.handleContacts)
    } else {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows([])
      });
    }
  }
}

const styles = StyleSheet.create({
  contact: {
    height: 50
  }
});
export default selectContacts;
