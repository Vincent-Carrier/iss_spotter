const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
} = require("./iss_promised");

fetchMyIP()
  .then(body => fetchCoordsByIP(JSON.parse(body).ip))
  .then(body => {
    const { longitude, latitude } = JSON.parse(body).data;
    return fetchISSFlyOverTimes({ longitude, latitude });
  })
  .then(body => {
    JSON.parse(body).response.forEach(flyover => {
      console.log(`Next pass at ${new Date(flyover.risetime)} for ${flyover.duration} seconds`);
    });
  })
  .catch(e => console.log("Better luck next time!", e));
