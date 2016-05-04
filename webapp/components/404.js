import React from 'react';
import {Link} from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>sorry, we don't know about that page.
        <Link to="/">Go home</Link>
      </div>
    )
  }
});
