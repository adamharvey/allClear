var React = require('react');
var ListContainer = require('./ListContainer');
var AddList = require('./AddList');
var ColorList = require('./ColorList');
var firebase = require('firebase');


var NotLoggedIn = React.createClass({
  render: function() {
    return (
      <div
      className="login-page">
      <img src='logo.png'/>
      <button onClick={this.props.that.handleGithubLogin} className="btn btn-success login-button">Login via GitHub</button>
      <button onClick={this.props.that.handleGoogleLogin} className="btn btn-success login-button2">Login via Google</button>
      </div>
    )
  }
});

var LoggedIn = React.createClass({
  render: function() {
    var lists = this.props.that.superList.map(function(list, index)  {
      return (
        <ListContainer parent={this} key={list.newTitle} defaultItem={list.newTitle} firebase={this.props.that.firebaseRef} removeList={this.props.that.removeList.bind(null, list.index)} index={list.index} />
      )
    }.bind(this));

    return (
      <div>
        <div className="container">
          <div className="row">
            <AddList add={this.props.that.addNewList}/>
          </div>
        </div>
        {lists}
        <div className="b">
      {window.users}
      </div>
      </div>
    )

  }
});

var App = React.createClass({
  componentDidMount: function() {
    this.firebaseRef.on('child_added', function(item) {
      if (item.val().newTitle != undefined)
        this.superList = this.superList.concat([{newTitle: item.val().newTitle, index: item.key()}]);
      this.setState({
        lists: this.superList
      });
    }.bind(this));
    this.firebaseRef.on('child_removed', function(item) {
      var key = item.key();
      this.superList = this.superList.filter(function(item) {
        return item.index !== key;
      });
      this.setState({
        lists: this.superList
      })
    }.bind(this));
  },
  getInitialState: function() {
    this.firebaseRef = new firebase("https://all-clear.firebaseio.com");
    this.superList = [];
    this.firebaseRef.child('users').set({ids:['Obert']});
    return {
      lists: []
    }
  },
  removeList: function(obj) {
    var confirmAnswer = window.confirm("Do you want to delete this group?");
    if (confirmAnswer == true) {
      var doubleConfirmAnswer = window.confirm("I'm double checking, are you sure?");
      if (doubleConfirmAnswer==true) {
        this.firebaseRef.child(obj).remove();
      }
    }  },
  selectColor: function(what) {

  },
  addNewList: function(obj){
    var newItem = {
      newTitle: obj,
      list: []
    };
  //  setTimeout( function(){
  //    debugger;
    this.firebaseRef.push(newItem)
  //});
  },
  handleGithubLogin: function(obj) {
    this.firebaseRef.authWithOAuthPopup("github",function(error, authData) {
      if (error) {
        console.log("Bad Login: " + error);
        return (
          <div>uh oh!</div>
        )
      } else {
        console.log("good login");
        //debugger;
        window.user = authData.github.displayName;
        //var users = this.firebaseRef.child("users");
        //users.set({ids:[window.user]});
        this.setState({user: authData.github.displayName});
      }
    }.bind(this));
  },
  handleGoogleLogin: function(obj) {
    this.firebaseRef.authWithOAuthPopup("google",function(error, authData) {
      if (error) {
        console.log("Bad Login: " + error);
        return (
          <div>uh oh!</div>
        )
      } else {
        console.log("good login");
        //debugger;
        window.user = authData.google.displayName;
        //var users = this.firebaseRef.child("users");
        //users.set({ids:[window.user]});
        this.setState({user: authData.google.displayName});
      }
    }.bind(this));
  },
  render: function(){
    var user = this.state.user;

    return (
      <div>
        {
          user == undefined ? ( <NotLoggedIn that={this} /> ) : ( <LoggedIn that={this} /> )
        }
      </div>
    )
  }
});

React.render(
  <App />,
  document.getElementById('app')
)
