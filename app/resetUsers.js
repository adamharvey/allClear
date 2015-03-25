var f = require('firebase');
var fr = new f("https://all-clear.firebaseio.com");
fr.child('users').set({ids:['Obert']});
