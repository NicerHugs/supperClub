import React, {
  Component,
  StyleSheet,
  Text,
  // View,
  Image,
  TouchableOpacity
} from 'react-native';

class ContactQuickView extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.removeContact}>
        <Image
          style={styles.thumbnail}
          source={this.props.contact.thumbnailPath? {uri: this.props.contact.thumbnailPath } : require('../images/thumbnail-placeholder.png')}/>
        <Text>{this.props.contact.displayName}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    padding: 5
  },
  thumbnail: {
    height: 40,
    width: 40,
    borderRadius: 20
  }
});
export default ContactQuickView;
