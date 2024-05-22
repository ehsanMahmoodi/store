require("dotenv").config();
const express = require("express");
const { MainRouter } = require("./src/main.routes");
const {
  AllExceptionsHandler,
} = require("./src/common/exceptions/all-exceptions-handler");
const {
  NotFoundHandler,
} = require("./src/common/exceptions/not-found-handler");
const main = () => {
  // initialize application
  const app = express();
  // config's
  // routing
  app.use(MainRouter);
  // error handling
  AllExceptionsHandler(app);
  NotFoundHandler(app);
  // connection
  app.listen(process.env.PORT, () =>
    console.log(`http://localhost:${process.env.PORT}`),
  );
};
main();
