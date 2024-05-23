const redisDB = require("redis");
const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on("connect", () => console.log("redisDB connected successfully"));
redisClient.on("error", async (err) => {
  console.log(`redisDB error: ${err}`);
  await redisClient.disconnect();
});
redisClient.on("ready", () =>
  console.log("redisDB connected successfully and ready to use."),
);
redisClient.on("end", () => console.log("redisDB disconnected"));
module.exports = { redisClient };
