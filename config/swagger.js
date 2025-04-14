const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BlogMS API',
      version: '1.0.0',
      description: 'API documentation for Blog Management System',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            username: {
              type: 'string',
              example: 'john_doe'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-07-21T10:00:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-07-21T10:00:00.000Z'
            }
          }
        },
        Post: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            title: {
              type: 'string',
              example: 'My First Post'
            },
            content: {
              type: 'string',
              example: 'This is my first blog post content'
            },
            imageUrl: {
              type: 'string',
              example: '/uploads/image.jpg'
            },
            authorId: {
              type: 'integer',
              example: 1
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-07-21T10:00:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-07-21T10:00:00.000Z'
            }
          }
        },
        Comment: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            content: {
              type: 'string',
              example: 'Great post!'
            },
            postId: {
              type: 'integer',
              example: 1
            },
            userId: {
              type: 'integer',
              example: 1
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-07-21T10:00:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2023-07-21T10:00:00.000Z'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;