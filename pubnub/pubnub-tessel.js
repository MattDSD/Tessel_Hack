var pubnub = require("pubnub").init({ publish_key: "demo", subscribe_key: "demo" });
var tessel = require("tessel");
 
pubnub.subscribe({ channel: "tessel-light", message: function(m) {
  tessel.led[1].output().toggle();
}});