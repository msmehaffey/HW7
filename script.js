var config = {
    apiKey: "AIzaSyD9D_XO1B0jO51Dg2nFKo9MHpDUxUG0p6U",
    authDomain: "trainschedule-9796e.firebaseapp.com",
    databaseURL: "https://trainschedule-9796e.firebaseio.com",
    projectId: "trainschedule-9796e",
    storageBucket: "trainschedule-9796e.appspot.com",
    messagingSenderId: "415902995902"
  };

  firebase.initializeApp(config);

var database = firebase.database();

$("#submitBtn").on("click", function(event) {
    event.preventDefault();

    var tName = $("#tNameInput").val().trim();
    var tDestination = $("#tDestinationInput").val().trim();
    var tTime = $("#tTimeInput").val().trim();
    var tFrequency = $("#tFrequencyInput").val().trim();
})