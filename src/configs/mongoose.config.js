const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_URI);
mongoose.connection.on("connected", () =>
  console.log("mongodb connected successfully"),
);
mongoose.connection.on("disconnected", (err) => {
  console.log(`mongodb connection disconnected. => ${err?.message}`);
});
mongoose.connection.on("error", (err) => {
  console.log(`mongodb connection has occurred error. => ${err?.message}`);
});
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
