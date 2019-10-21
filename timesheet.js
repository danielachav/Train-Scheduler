var firebaseConfig = {
    apiKey: "AIzaSyAxRXmREYdzn5GQFIr33O0XmhjQwfJHCpk",
    authDomain: "smu-projects-257bb.firebaseapp.com",
    databaseURL: "https://smu-projects-257bb.firebaseio.com",
    projectId: "smu-projects-257bb",
    storageBucket: "",
    messagingSenderId: "995165991947",
    appId: "1:995165991947:web:4c999130f788e4a635430e"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var firstTrainTime = moment($("#first-train-time-input").val().trim(), "HH:mm").format("X");
    var trainFrequ = $("#frequency-input").val().trim();
  
  
    var newTrain = {
      name: trainName,
      destination: trainDest,
      time: firstTrainTime,
      frequency: trainFrequ
    };
  
    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
  
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().time;
    var trainFrequ = childSnapshot.val().frequency;
  
    console.log(trainName);
    console.log(trainDest);
    console.log(firstTrainTime);
    console.log(trainFrequ);
  
    var trainDiff = moment().diff(moment.unix(firstTrainTime), "minutes");
    var trainRemainder = trainDiff % trainFrequ;
    var minutesTillArrival = trainFrequ - trainRemainder;
    var nextTrainTime = moment().add(minutesTillArrival, "m").format("hh:mm A");
  
   
    
  
    var newRow = $("<tr>").append(
      $("<td class='text-center'>").text(trainName),
      $("<td class='text-center'>").text(trainDest),
      $("<td class='text-center'>").text(trainFrequ),
      $("<td class='text-center'>").text(nextTrainTime),
      $("<td class='text-center'>").text(minutesTillArrival),
    );
  
    $("#train-table > tbody").append(newRow);
  });