// $npm install node-geocoder

var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyAVuPSHMjNYDUqjY_rvl9wHTaVBbFpSQho', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);
// Using Promise
// geocoder.geocode('2536 Cerro Vista Ln., Alamo')
// .then(function(res) {
//   console.log(`\nThere are ${res.length} matches\n`);
//   console.log(res);
//   console.log(res[0].latitude, res[0].longitude);
// })
// .catch(function(err) {
//   console.log('ಠ_ಠ');
//   console.log(err.message);
// });

module.exports = geocoder;
