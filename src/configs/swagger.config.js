const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
function swaggerConfig(app) {
  const swaggerDocument = swaggerJsDoc({
    swaggerDefinition: {
      openapi: "3.0.0",
      failOnErrors: true,
      info: {
        title: "store",
        description: "",
        version: "1.0.0",
      },
      servers: [
        {
          description: "development server",
          url: "http://localhost:3000",
        },
        {
          description: "product",
          url: "http://localhost:5000",
        },
      ],
      tags: [
        {
          name: "Blog",
          description: "Blog Module's and Route's",
        },
        {
          name: "Category",
          description: "Category Module's and Route's",
        },
        {
          name: "Auth",
          description: "Auth Module's and Route's",
        },
        {
          name: "User",
          description: "User Module's and Route's",
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
    apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
  });
  const swagger = swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      validatorUrl: false,
      defaultModelsExpandDepth: -1,
    },
  });
  app.use("/api/swagger", swaggerUi.serve, swagger);
}
module.exports = { swaggerConfig };
