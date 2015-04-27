var React = require('react');

var List = React.createClass({
  render: function(){
        if (this.props.items == undefined) this.props.items = [];
        var listItems = this.props.items.map(function(item, index){
          var s = {background: '#'+index+index+index};
          var deleteStyles = "glyphicon glyphicon-remove redIcon";
          var doneStyles = "glyphicon glyphicon-ok greenIcon";
          var clazz={};
          if (item.indexOf(' - Done')>=0) {
            clazz = {
             textDecoration: 'line-through'
            };
            doneStyles = "";
          }
      return (

        <li key={index} className="list-group-item">
        <span className={doneStyles} title='Mark completed' onClick={this.props.markCompleted.bind(null, index)}></span>

        <span className={deleteStyles} title='Remove from list' onClick={this.props.remove.bind(null, index)}></span>
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
