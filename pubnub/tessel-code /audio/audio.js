// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This Audio Module demo will record audio through
the mic while the CONFIG button is held down.
When the CONFIG button is released, the recorded
audio will be played back through the audio
out jack.
*********************************************/

var tessel = require('tessel');
var audio = require('audio-vs1053b').use(tessel.port['A']);
var fs = require('fs');
var audioFileChill = 'Gorillaz-Rhinestone Eyes.mp3';
var audioFileParty = '09 Not Exactly.mp3';


var chunks = [];

// When we get data, push it into our array
audio.on('data', function(data) {
  chunks.push(data);
});

// Wait for the module to connect
audio.on('ready', function() {
  console.log('Hold the config button to record...');
  // When the config button is pressed, start recording
  tessel.button.once('press', startRecording);
});


function startRecording() {
  // Tell the audio module to start recording
  audio.startRecording('voice', function() {
    console.log('Recording...');
    // Once the button is released, stop recording
    tessel.button.once('release', stopRecording);
  });
}

function stopRecording() {
  // Tell the audio module to stop recording
  console.log('stopping the recording...');
  audio.stopRecording(function() {
    console.log('Playing it back...');
    // Concat the data and play it
    audio.play(Buffer.concat(chunks), function(err) {
      // When we're done playing, clear recordings
      chunks = [];
      console.log('Hold the config button to record...');
      // Wait for a button press again
      tessel.button.once('press', startRecording);
    });
  });
}

/*********************************************
This Audio Module demo sets volume, then plays
an audio file out over Headphones/Line out
*********************************************/






// Wait for the module to connect
audio.on('ready', function() {
  console.log("Audio module connected! Setting volume...");
  // Set the volume in decibels. Around 20 is good; smaller is louder.
  audio.setVolume(20, function(err) {
    if (err) {
      return console.log(err);
    }
    // Get the song
    console.log('Retrieving file...');
    var song = fs.readFileSync(audioFile);
    // Play the song
    console.log('Playing ' + audioFileChill + '...');
    audio.play(song, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Done playing', audioFileChill);
      }
    });
  });
});


// If there is an error, report it
audio.on('error', function(err) {
  throw err;
});