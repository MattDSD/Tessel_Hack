require(‘tesselate’)({
  modules: {
    A: [‘ambient-attx4’, ‘ambient’], // load accelerometer module, aliased as ‘ambient’ on port A
    B: [‘audio-vs1053b’, ‘audio’]        // load IR module, aliased as ‘audio’ on port B
    D: ['rfid-pn532', 'rfid'] //load RFID module, aliased as 'rfid' on port D
  },
  development: true              // enable development logging, useful for debugging
}, function(tessel, m){

  // returns tessel to you as 'tessel'

  // returns your modules to you as properties of object m
  // refer to the ambient module as m.ambient, or the audio module as m.audio, or rfid as m.rfid

  //your code here
});