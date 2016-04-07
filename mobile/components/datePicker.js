import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  DatePickerAndroid,
  TimePickerAndroid
} from 'react-native';

const dayMap = [
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
]
const monthMap = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
]

function formatDate(date) {
  return `${dayMap[date.getDay()]}, ${monthMap[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function formatTime(date) {
  var hours = date.getHours();
  var mins = date.getMinutes();
  var modifier = 'am';
  if (hours > 12) {
    hours = hours - 12;
    modifier = 'pm';
  } else if (hours === 0) {
    hours = 12;
  }
  if (mins.toString().length < 2) {
    mins = '0'+mins;
  }
  return `${hours}:${mins}${modifier}`;
}

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.showDatePicker = this.showDatePicker.bind(this);
    this.showTimePicker = this.showTimePicker.bind(this);
  }
  showDatePicker() {
    DatePickerAndroid.open({date: this.props.date, minDate: this.props.minDate}).then(({day, month, year, action}) => {
      if (action === 'dismissedAction') return;
      var date = new Date(year, month, day);
      date.setHours(this.props.date.getHours());
      date.setMinutes(this.props.date.getMinutes());
      this.props.handleDate(this.props.stateKey, date)
    })
  }
  showTimePicker() {
    TimePickerAndroid.open({hour: this.props.date.getHours(), minute: this.props.date.getMinutes(), is24Hour: false}).then(({minute, hour, action}) => {
      if (action === 'dismissedAction') return;
      var date = new Date(this.props.date);
      date.setHours(hour);
      date.setMinutes(minute)
      this.props.handleDate(this.props.stateKey, date)
    })
  }
  render() {
    return (
      <View style={styles.body}>
        <TouchableOpacity
          onPress={this.showDatePicker}
          style={styles.body}>
          <Text>{formatDate(this.props.date)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.showTimePicker}>
          <Text>{formatTime(this.props.date)}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {

  }
});

export default DatePicker;
