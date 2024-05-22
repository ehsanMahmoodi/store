const NotFoundHandler = (app) => {
  app.use((req, res, next) => {
    return res.status(404).send({
      statusCode: res.statusCode,
      data: {
        message: "صفحه مورد نظر یافت نشد.",
      },
    });
  });
};
module.exports = { NotFoundHandler };
