const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, ip) => {
    if (err) {
      callback(err, null);
    }
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        callback(err, null);
      }
      fetchISSFlyOverTimes(coords, (err, flyovers) => {
        if (err) {
          callback(err, null);
        }
        callback(null, flyovers);
      });
    });
  });
};

nextISSTimesForMyLocation((err, flyovers) => {
  if (err) console.log(err);
  else {
    for (const flyover of flyovers) {
      console.log(`Next pass at ${new Date(flyover.risetime)} for ${flyover.duration} seconds`);
    }
  }
});
