var React = require('react');

var List = React.createClass({
  render: function(){
        if (this.props.items == undefined) this.props.items = [];
        var listItems = this.props.items.map(function(item, index){
          var s = {background: '#'+index+index+index};
      return (

        <li key={index} className="list-group-item">
        <span
        className="glyphicon glyphicon-remove delete"
        onClick={this.props.remove.bind(null, index)}>
        </span>
        <span class="todoItem">
      {item}
      </span>
      </li>
    )
  }.bind(this));
  return (
    <ul>
  {listItems}
  </ul>
)
}
});

module.exports = List;
