import React from 'react';
import {Link} from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>User view event {this.props.params.event} {this.props.children}</div>
    )
  }
});
