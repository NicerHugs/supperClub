import React from 'react';
import {Link} from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>User has a token {this.props.params.token}</div>
    )
  }
});
