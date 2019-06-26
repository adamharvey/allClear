var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');
var $ = require('jquery');

var ListContainer = React.createClass({
  getInitialState: function(){
    this.firebaseRef = this.props.firebase;
    return {
      list: []
    }
  },
  componentDidMount: function() {
    this.firebaseRef.on('value', function(items) {
      window.count = 0;
      Object.keys(items.val()).forEach(function(key) {
        var item = items.val()[key];
        if (item.items != undefined)
          window.count += item.items.filter(function(i) {
            return i.indexOf("Done")<0;
          }).length;
        if (key == 'users') {
          if (item.ids.indexOf(window.user) < 0) {
            item.ids.unshift(window.user);
            this.firebaseRef.child('users').set(item);
          }
          window.users = item.ids.join(", ");
          this.props.parent.forceUpdate();
        }
        if (key == 'slack') {
          window.slack = item;
        }
        if (this.props.defaultItem === item.newTitle) {
          this.setState({
            list: item.items
          });
        };
      }.bind(this));
    }.bind(this));
    this.firebaseRef.on('child_changed', function(item) {
      if (this.props.defaultItem === item.val().newTitle) {
        this.setState({
          list: item.val().items
        });
      }
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
  handleAddItem: function(newItem){
    if (this.state.list == undefined)
      this.state.list = []; //TODO: why is it undefined?
    var name = ', reported by ' + window.user;
    if (this.props.defaultItem.toLowerCase().indexOf('release')>=0)
      name = '';
    var that = this;
    newItem.split("\n").forEach(function(partItem) {
      if (partItem.trim().length>0) {
        var updatedItemList = that.state.list.concat([partItem + ' ' + name]);
        that.state.list = updatedItemList;
      }
    });
    this.firebaseRef.child(this.props.index).set({newTitle: this.props.defaultItem, items: this.state.list});
  },
  handleRemoveItem: function(index){
    if (window.confirm("Only delete this item if it was mistakenly entered. Continue?")) {
      var newList = this.state.list;
      newList.splice(index, 1);
      this.firebaseRef.child(this.props.index).set({newTitle: this.props.defaultItem, items: newList});
    }
  },
  handleMarkCompleted: function(index){
    if (window.confirm("Has this item been completed?")) {
        var newList = this.state.list;
        newList[index] = newList[index] + ' - Done!';
        //newList.splice(index, 1);
        var msg = '{"text": "'+newList[index]+'('+(window.count-1)+' left)", "icon_url":"https://all-clear-f9982.firebaseapp.com/logo.png", "username":"allClear"}';
        $.ajax({
          type: "POST",
          url: window.slack,
          data: msg
        });

        this.firebaseRef.child(this.props.index).set({newTitle: this.props.defaultItem, items: newList});
    }
  },
  render: function(){
    return (
      <div className="outerBorder">
      <div className="midBorder">
      <div className="titleBorder">
      <span
      className="glyphicon glyphicon-remove redIcon " title="Remove list (Bad)"
      onClick={this.props.removeList.bind(null, this.props.index)}/>
      <span className="text-center">{this.props.defaultItem}</span>
      </div>
      <AddItem add={this.handleAddItem} placeholder={'Enter a ' + this.props.defaultItem + ' item & hit enter'}/>
      <List items={this.state.list} remove={this.handleRemoveItem} markCompleted={this.handleMarkCompleted}/>
      </div>
      </div>
    )
  }
});

module.exports = ListContainer;
