
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API for an e-commerce platform'
    },
    servers: [
      {
        url: 'http://localhost:3000/api'
      }
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            price: {
              type: 'number'
            },
            category: {
              type: 'string'
            },
            stock: {
              type: 'number'
            }
          }
        },
        Anusthan: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the anusthan'
            },
            name: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            price: {
              type: 'number'
            }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/api/routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
