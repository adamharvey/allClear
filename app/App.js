var React = require('react');
var ListContainer = require('./ListContainer');
var AddList = require('./AddList');
var ColorList = require('./ColorList');
var firebase = require('firebase');

var App = React.createClass({
  componentDidMount: function() {
    this.firebaseRef.on('child_added', function(item) {
      this.setState({
        lists: this.state.lists.concat([{newTitle: item.val().newTitle, index: item.key()}])
      })
    }.bind(this));
    this.firebaseRef.on('child_removed', function(item) {
      var key = item.key();
      var newList = this.state.lists.filter(function(item) {
        return item.index !== key;
      });
      this.setState({
        lists: newList
      })
    }.bind(this));
  },
  getInitialState: function() {
    this.firebaseRef = new firebase("https://all-clear.firebaseio.com");

    return {
      lists: []
    }
  },
  removeList: function(obj) {
    alert(obj);
    debugger;
    this.firebaseRef.child(obj).remove();
  },
  selectColor: function(what) {

  },
  addNewList: function(obj){
    var newItem = {
      newTitle: obj
    };
  //  setTimeout( function(){
  //    debugger;
    this.firebaseRef.push(newItem)
  //});
  },
  render: function(){
    var lists = this.state.lists.map(function(list, index)  {

      return (
        <ListContainer defaultItem={list.newTitle} removeList={this.removeList.bind(null, list.index)}  />
      )
    }.bind(this));
    return (
      <div>
      <div className="container">
      <div className="row">
      <AddList add={this.addNewList}/>
      </div>
      </div>
    {lists}
    </div>
    )
  }
});

React.render(
  <App />,
  document.getElementById('app')
)
