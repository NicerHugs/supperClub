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
  return `${date.getHours()}:${date.getMinutes()}`;
}

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.showDatePicker = this.showDatePicker.bind(this);
    this.showTimePicker = this.showTimePicker.bind(this);
  }
  showDatePicker() {
    DatePickerAndroid.open({date: this.props.date, minDate: this.props.minDate}).then(({day, month, year, action}) => {
      var date = new Date(year, month, day);
      date.setHours(this.props.date.getHours());
      date.setMinutes(this.props.date.getMinutes());
      this.props.handleDate(this.props.stateKey, date)
    })
  }
  showTimePicker() {
    TimePickerAndroid.open({hour: this.props.date.getHours(), minute: this.props.date.getMinutes, is24Hour: false}).then(({minute, hour, action}) => {
      var date = new Date(this.props.date);
      console.log(hour);
      date.setHours(hour);
      date.setMinutes(minute)
      this.props.handleDate(this.props.stateKey, date)
    })
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={this.showDatePicker}>
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

export default DatePicker;
