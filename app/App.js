var React = require('react');
var ListContainer = require('./ListContainer');
var AddList = require('./AddList');

var App = React.createClass({
  getInitialState: function() {
    return {
      lists: []
    }
  },
  removeList: function(obj) {
    alert(obj);
    //indexes don't all auto update themselves
    this.state.lists.splice(obj,1);
    for (i=obj;i<this.state.lists.length;i++)
      this.state.lists[i].index--;
    this.forceUpdate();
  },
  addNewList: function(obj){
    var newList = {
      newTitle: obj,
      index: this.state.lists.length
    };
    this.state.lists = this.state.lists.concat([newList]);
        this.forceUpdate();
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
