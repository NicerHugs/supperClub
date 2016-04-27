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

class EventDetail extends Component {
  render() {
    console.log(this.props);
    return (
      <View>
        <Text>EVENT DETAIL {this.props.data.title}</Text>
      </View>
    )
  }
};

export default EventDetail;
