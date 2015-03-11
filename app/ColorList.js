var React = require('react');

var ColorList = React.createClass({
  getInitialState: function() {
    return {
      items: ['red','blue']
    }
  },
  render: function() {
    var colors = this.state.items.map(function(item, index) {
      return (
        <span
        onClick={this.props.selectColor.bind(null, item)}
        >
      {item}
        </span>
      )
    });
    return (
      <div>
    {colors}
      </div>
    )
  }
});

module.exports = ColorList;
