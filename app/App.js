var React = require('react');
var ListContainer = require('./ListContainer');
var AddList = require('./AddList');
var ColorList = require('./ColorList');
var firebase = require('firebase');
var $ = require('jquery');
var SlackConfig = require('./SlackConfig');

var NotLoggedIn = React.createClass({
  render: function() {
    return (
      <div className="login-page">
        <img className="logo" src='logo.png'/>
        <br/>
          <button onClick={this.props.that.handleGithubLogin} className="btn btn-success button-login-github">Login via GitHub</button>
          <br/>
          <button onClick={this.props.that.handleGoogleLogin} className="btn btn-success button-login-google">Login via Google</button>
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
      <div className="parallax">
      <div className="parallax-layer parallax-background">
      <div className="grid">
      </div>
      </div>

      <div className="parallax-layer parallax-foreground">
      <div className="headers">
        <img className="logo" src='logo.png'/>
        <br/>
        <span className="text-block">{window.count} issues left</span>
      </div>
      <div className="clear">
        {lists}
        <div className="outerBorder">
      {window.users}
      </div>
      <div>
        <div className="row">
          <AddList add={this.props.that.addNewList}/>
          <SlackConfig firebase={this.props.that.firebaseRef}/>
        </div>
      </div>
      </div>
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
    this.firebaseRef.push(newItem)
  },
  handleGithubLogin: function(obj) {
    this.firebaseRef.authWithOAuthPopup("github",function(error, authData) {
      if (error) {
        console.log("Bad Login: " + error);
        return (
          <div>uh oh!</div>
        )
      } else {
        window.user = authData.github.displayName;
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
        window.user = authData.google.displayName;
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
