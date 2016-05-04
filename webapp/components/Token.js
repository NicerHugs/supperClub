import React from 'react';
import {Link, browserHistory} from 'react-router';
import 'whatwg-fetch';

export default React.createClass({
  getInitialState() {
    return {
      event : {}
    };
  },
  componentDidMount() {
    fetch(`/api/v1/${this.props.params.event}/${this.props.params.token}`, {})
    .then(response => response.json())
    .then(this.setState.bind(this))
    .catch(err => {
      browserHistory.push('/404')
    })
  },
  componentWillUnmount() {

  },
  RSVP(rsvp) {
    fetch(`/api/v1/${this.props.params.event}/${this.props.params.token}/`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({response: rsvp})
    })
    .then(response => response.json())
    .then(this.setState.bind(this))
    .catch(err => console.log('err', err));
  },
  render() {
    const isDisabled = this.state.attending || this.state.full;
    return (
      <div>
        <h2>{this.state.event.title}</h2>
        <h3>hosted by {this.state.event.owner}</h3>
        <p>{this.state.event.description}</p>
        <input
          onClick={this.RSVP.bind(this, true)}
          type="button"
          value="I'm Going!"
          disabled={isDisabled}/>
        <input
          onClick={this.RSVP.bind(this, false)}
          type="button"
          value="I'm NOT Going!"/>
      </div>
    )
  }
});
