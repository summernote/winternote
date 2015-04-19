/*jshint node: true*/
'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  render: function () {
    return <p className="note-para">
      {this.props.text.replace(/ /g, '\u00a0')}
    </p>;
  }
});
