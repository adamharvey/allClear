var firebase = require('firebase');
var firebaseRef = new firebase("https://all-clear.firebaseio.com");
firebaseRef.child('users').set({ids:['Obert']});
