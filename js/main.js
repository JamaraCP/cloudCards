  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDX63kR1H4KrSrxreImMym9WD24WFCHyNQ",
    authDomain: "cloudcards-f8230.firebaseapp.com",
    databaseURL: "https://cloudcards-f8230.firebaseio.com",
    projectId: "cloudcards-f8230",
    storageBucket: "cloudcards-f8230.appspot.com",
    messagingSenderId: "184738942400"
  };
  firebase.initializeApp(config);

$(document).ready(
	function(){
    //pageLogin();
		pageLoginCards();
	});
