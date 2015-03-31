var React = require('react');

var List = React.createClass({
  render: function(){
        if (this.props.items == undefined) this.props.items = [];
        var listItems = this.props.items.map(function(item, index){
          var s = {background: '#'+index+index+index};
          var names = "glyphicon glyphicon-remove delete";
          var clazz={};
          if (item.indexOf(' - Done')>=0) {
            clazz = {
             textDecoration: 'line-through'
            };
            names="";
          }
      return (

        <li key={index} className="list-group-item">
        <span
        className={names}
        onClick={this.props.remove.bind(null, index)}>
        </span>
        <span style={clazz}>
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
