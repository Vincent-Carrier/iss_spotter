const request = require("request");

exports.fetchMyIP = function(callback) {
  request("https://api6.ipify.org?format=json", (err, response, body) => {
    if (err) {
      callback(err, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    }
  });
};

exports.fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (err, response, body) => {
    if (err) {
      callback(err, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coords. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const { longitude, latitude } = JSON.parse(body).data;
      callback(null, { longitude, latitude });
    }
  });
};

exports.fetchISSFlyOverTimes = function({ longitude, latitude }, callback) {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`,
    (err, response, body) => {
      if (err) {
        callback(err, null);
      } else if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coords. Response: ${body}`;
        callback(Error(msg), null);
      } else {
        const flyovers = JSON.parse(body).response;
        callback(null, flyovers);
      }
    }
  );
};
