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
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.updateSearch = this.updateSearch.bind(this);
    this.handleContacts = this.handleContacts.bind(this);
    this.renderContact = this.renderContact.bind(this);
    this.state = {
      searchTerm: '',
      dataSource: ds.cloneWithRows([])
    };
  }
  render() {
    var selected = this.props.selectedContacts.map((contact, i) => {
      return (
        <ContactQuickView
          contact={contact}
          key={i}
          removeContact={() => this.props.contactRemoved(contact)}/>
      )
    })
    return (
      <View>
        {selected}
        <TextInput
          value={this.state.searchTerm}
          onChangeText={this.updateSearch}
          placeholder={selected.length ? "Tap to add more guests" : "Guests"}>
        </TextInput>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderContact}
        />
      </View>
    )
  }
  selectContact(data) {
    contacts.getPhoneNum(data.recordID.toString(), (err, phoneNumber) => {
      if (err) throw new Error();
      data.phoneNumber = phoneNumber;
      this.props.contactSelected(data);
    });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([]),
      searchTerm: ''
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
