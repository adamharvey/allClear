var React = require('react');

var List = React.createClass({
  render: function(){
        if (this.props.items == undefined) this.props.items = [];
        var listItems = this.props.items.map(function(item, index){
          var s = {background: '#'+index+index+index};
          var deleteStyles = "glyphicon glyphicon-remove redIcon";
          var doneStyles = "glyphicon glyphicon-ok greenIcon";
          var itemParts = item.split(/([eEmM][aAiI][sSlL]-\d*)/);
          var clazz={};
          if (item.indexOf(' - Done')>=0) {
            clazz = {
             textDecoration: 'line-through'
            };
            doneStyles = "";
          }
          var pre = itemParts[0];
          var mid = 'https://jira.octanner.com/browse/'+itemParts[1];
          var mid2 =itemParts[1];
          var post = itemParts[2];
          if (itemParts.length == 1)
          item = ({item})
          else
          item = (<span>{pre}
            <a href={mid} target="_blank">
            {mid2}
            </a>
            {post}</span>)
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
