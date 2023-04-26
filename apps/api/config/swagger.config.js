import swaggerJsdoc from "swagger-jsdoc"

const options = {
    swaggerDefinition: {
      // Like the one described here: https://swagger.io/specification/#infoObject
      info: {
        title: 'Piiquante',
        version: '1.0.0',
        description: 'API documentation for Piiquante OpenClassRoom',
        contact: {
          name: 'Jeremy Zmirou',
          email: 'j.zmirou@gmail.com',
        },
      },
      basePath: '/api-docs',
    },
    // List of files to be processes. You can also set globs './routes/*.js'
    apis: ['./src/routes/*.js'],
  };
  
export const swaggerSpec = swaggerJsdoc(options);