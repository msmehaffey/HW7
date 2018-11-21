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

    var newTrain = {
      train: tName,
      destination: tDestination,
      time: tTime,
      frequency: tFrequency
    };

    database.ref().push(newTrain);

    $("#tNameInput").val("");
    $("#tDestinationInput").val("");
    $("#tTimeInput").val("");
    $("#tFrequencyInput").val("");

});

database.ref().on("child_added", function(trainView) {
  var tName = trainView.val().train;
  var tDestination = trainView.val().destination;
  var tTime = trainView.val().time;
  var tFrequency = trainView.val().frequency;


  /* Here I am finding the current time of day in minutes since
  the beginning of the day. I do this by get the time now in hours
  and the time now in minutes. I multiply the hours by 60 and 
  add the minutes to them. I parse them into numbers prior to adding them
  I do this so I can find the difference in minutes between now and the
  first train. */

  var tNowH = parseInt(moment().format("HH"));
  var tNowM = parseInt(moment().format("mm"));
  var tNow = (tNowH * 60 + tNowM);

  /* Next I convert the time entered as the first train 
  into the HH:mm format. I then parse the value and convert that 
  into total minutes. After I subrtract this number from the 
  current time of day in minutes so that I can get the total 
  number of minutes since the first train */

  var pTTime = moment(tTime, "HH:mm");
  var tTrainH = parseInt(moment(pTTime).format("HH"));
  var tTrainM = parseInt(moment(pTTime).format("mm"));
  var tTrain = (tTrainH * 60 + tTrainM);

  var tDifference = tNow - tTrain;

  /* Here I caclculate how many minutes until the 
  next arrival. I do this by taking that difference in minutes
  between the first train and the time now and using the modulus
  operator to tell me how many minutes have passed since the 
  last train. Then I subtract this from the frquency and it 
  tells me how many minutes left until the next train */
  var minutesLeft = tFrequency - (tDifference % tFrequency);

  /* Now that I have how many minutes are left until the next
  train, I simply add that to the current moment in minutes and
  return format that value to HH:mm and that is the time of the next
  arrival. 
  
  Extended this section for determining next arrival to make changes if the first train is scheduled for the future,
  What I did here was declared the variable next arrival and created a function to determine the next arrival time, passing in 
  two arguments, a and b. I then call the function below and pass in the current time in minutes and the time of first Train in minutes
  if the current time is greater than, in minutes, so in otherwords later than the first train time then the current time is calculated, 
  followed by adding the minutes left until the next arrival to it to calculate the next train time. However i used a Terernary operator to
  say that if the first train time is later than the current time then the next arrival will be set to the input value for the first train time
  and the the minutes left till the next arrival is the difference in minutes of the first train time and the current time.*/
  var nextArrival; 
  
  function determineNextArrival(a,b) {
  a > b ? nextArrival = moment().add(minutesLeft, 'm').format("HH:mm") : (nextArrival = tTime, minutesLeft = b - a);
  };

  // The function is called here passing in the two arguments.
  determineNextArrival(tNow, tTrain);

  console.log(minutesLeft);

  var newRow = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tDestination),
    $("<td>").text(tFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesLeft)
  );

  $("#tTable > tbody").append(newRow);
});

