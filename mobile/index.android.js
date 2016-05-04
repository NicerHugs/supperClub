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
import EventCreate from './components/pages/eventCreate.js';
import EventDetail from './components/pages/eventDetail.js';

class mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: EventCreate,
      data: {}
    }
    this.handleRoute = this.handleRoute.bind(this);
  }
  handleRoute(route, data) {
    console.log(route);
    if (route === 'eventDetail') {
      this.setState({page: EventDetail, data: data})
    }
  }
  render() {
    return (
      <this.state.page data={this.state.data} routeChange={this.handleRoute}/>
    )
  }
};

AppRegistry.registerComponent('mobile', () => mobile);
