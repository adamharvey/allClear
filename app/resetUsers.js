var f = require('firebase');

var config = {
  apiKey: "AIzaSyBXVCGq_o_XfEkPhiEKyB9z_eTaLz_srRk",
  authDomain: "all-clear-f9982.firebaseapp.com",
  databaseURL: "https://all-clear-f9982.firebaseio.com"
};
f.initializeApp(config);

//    this.firebaseRef = new firebase("https://all-clear.firebaseio.com");

// this.firebaseRef = firebase.database().ref();

// var fr = new f("https://all-clear.firebaseio.com");
var fr = f.database().ref();
fr.child('users').set({ids:['Obert']});
