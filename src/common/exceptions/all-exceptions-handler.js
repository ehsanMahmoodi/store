const AllExceptionsHandler = (app) => {
  app.use((err, req, res, next) => {
    let status = err?.status || err?.code || err?.statusCode;
    if (!status || isNaN(+status) || status > 511 || status < 200) status = 500;
    return res.status(status).send({
      statusCode: res.statusCode,
      data: {
        message: err?.message || err?.stack || "Internal Server Error",
      },
    });
  });
};
module.exports = { AllExceptionsHandler };
