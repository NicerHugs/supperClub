import React, {
  Component,
  StyleSheet,
  TextInput,
  Text,
  View,
  ListView,
  TouchableOpacity
} from 'react-native';

const contacts = [
  {name: 'jess scheuring'},
  {name: 'nicer hugs'},
  {name: 'bill murray'}
]

class selectContacts extends Component {
  constructor() {
    super();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.updateSearch = this.updateSearch.bind(this);
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }
  updateSearch(text) {
    // request contacts here
    // when they return, update state to reflect selected ones
    var filteredContacts = [];
    if (text.trim()) {
      filteredContacts = contacts.filter(contact => {
        return contact.name.toLowerCase().indexOf(text.toLowerCase()) >= 0;
      })
    }
    this.setState({dataSource: this.state.dataSource.cloneWithRows(filteredContacts)});
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
}

function renderContact(rowData) {
  return (
    <Text>{rowData.name}</Text>
  )
}

export default selectContacts;
