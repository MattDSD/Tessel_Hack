 function publish(ambientData) {

  pubnub = PUBNUB.init({
     publish_key   : 'demo',
     subscribe_key : 'demo'
  });

  // Tell SDK to subscribe and upon connection publish [ambientData]
  pubnub.subscribe({
     channel : "surprise_party",
     message : function(message,envelope,channel){
       console.log('message', 'envelope', 'channel');
     },
     connect: pub
  });

  // Tell SDK to pusblish to pubnub
  function pub() {
    pubnub.publish({
      channel : "surprise_party,
      message : ambientData",
      callback: function(publishCallbackResponse){ console.log(publishCallbackResponse) }
    });
  }
 };

/*********************************************
This ambient module publishes {light 0.0f8 - 1.0f8, sound: 0.0f8-1.0f8} JSON
every half second
*********************************************/
var pubnub = require("pubnub-hackathon").init({publish_key: "demo", subscribe_key: "demo" });
var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port['B']);

ambient.on('ready', function () {
 // Get points of light and sound data.
  setInterval( function () {
    ambient.getLightLevel( function(err, ldata) {
      if (err) throw err;
      ambient.getSoundLevel( function(err, sdata) {
        if (err) throw err;
        // console.log("Light level:", ldata.toFixed(8), " ", "Sound Level:", sdata.toFixed(8));
        var JSONPayload = JSON.stringify({light: ldata, sound: sdata});
        publish(JSONPayload);
    });
  })}, 500); // The readings will happen every .5 seconds unless the trigger is hit







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   ambient.setLightTrigger(0.5);

//   // Set a light level trigger
//   // The trigger is a float between 0 and 1
//   ambient.on('light-trigger', function(data) {
//     console.log("Our light trigger was hit:", data);

//     // Clear the trigger so it stops firing
//     ambient.clearLightTrigger();
//     //After 1.5 seconds reset light trigger
//     setTimeout(function () {

//         ambient.setLightTrigger(0.5);

//     },1500);
//   });

//   // Set a sound level trigger
//   // The trigger is a float between 0 and 1
//   ambient.setSoundTrigger(0.1);

//   ambient.on('sound-trigger', function(data) {
//     console.log("Something happened with sound: ", data);

//     // Clear it
//     ambient.clearSoundTrigger();

//     //After 1.5 seconds reset sound trigger
//     setTimeout(function () {

//         ambient.setSoundTrigger(0.1);

//     },1500);

//   });
// });

ambient.on('error', function (err) {
  console.log(err);
});