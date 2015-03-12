var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');
var firebase = require('firebase');

var ListContainer = React.createClass({
  getInitialState: function(){
    this.firebaseRef = this.props.firebase;
    debugger;
    return {
      list: []
    }
  },
  componentDidMount: function() {
    this.firebaseRef.on('value', function(items) {
      Object.keys(items.val()).forEach(function(key) {

        var item = items.val()[key];
        if (this.props.defaultItem === item.newTitle) {
          this.setState({
            list: item.items
          });
        };
      }.bind(this));
    }.bind(this));
    this.firebaseRef.on('child_changed', function(item) {
      if (this.props.defaultItem === item.val().newTitle) {
        debugger;
        this.setState({
          list: item.val().items
        });
      }
    }.bind(this));
    this.firebaseRef.on('child_removed', function(item) {
      debugger;
      var key = item.key();
      var newList = this.state.lists.filter(function(item) {
        return item.index !== key;
      });
      this.setState({
        lists: newList
      })
    }.bind(this));
  },
  handleAddItem: function(newItem){
debugger;
if (this.state.list == undefined)
  this.state.list = []; //TODO: why is it undefined?
    this.firebaseRef.child(this.props.index).set({newTitle: this.props.defaultItem, items: this.state.list.concat([newItem])});
  },
  handleRemoveItem: function(index){
    var newList = this.state.list;
    newList.splice(index, 1);
    this.firebaseRef.child(this.props.index).set({newTitle: this.props.defaultItem, items: newList});
  },
  render: function(){
    return (
      <div className="col-sm-6 b">
      <div className="col-sm-12 a">
      <div className="c">
      <span
      className="glyphicon glyphicon-remove delete top-corner"
      onClick={this.props.removeList.bind(null, this.props.index)}/>
      <h3 className="text-center">{this.props.defaultItem}</h3>
      </div>
      <AddItem add={this.handleAddItem} placeholder={'new ' + this.props.defaultItem + ' item'}/>
      <List items={this.state.list} remove={this.handleRemoveItem}/>
      </div>
      </div>
    )
  }
});

module.exports = ListContainer;
