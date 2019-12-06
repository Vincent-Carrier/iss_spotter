const request = require("request-promise-native");

exports.fetchMyIP = function() {
  return request("https://api6.ipify.org?format=json");
};

exports.fetchCoordsByIP = function(ip) {
  return request(`https://ipvigilante.com/${ip}`);
};

exports.fetchISSFlyOverTimes = function({ longitude, latitude }) {
  return request(
    `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`
  );
};
