const {
  createBook, getBooks, updateBook, deleteBook,
} = require('./books');
const { createUser } = require('./users');

const apiDocumentation = {
  openapi: '3.0.2',

  info: {
    version: '1.0.0',
    title: 'Librarium - API Documentation',
    description: 'Here is documentation to access Libarrium API',
    contact: {
      name: 'Fathurrohman Nasrudin',
      email: 'fath.nasrudin@gmail.com',
      url: '-',
    },
  },

  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local Server',
    },
  ],

  tags: [
    {
      name: 'Books',
    },
    {
      name: 'Users',
    },
    {
      name: 'Transaction',
    },
  ],

  components: {
    hiddenSchemas: {

    },
    schemas: {
      BookWithId: {
        allOf: [

          { $ref: '#/components/schemas/Id' },
          { $ref: '#/components/schemas/Book' },
          { $ref: '#/components/schemas/Timestamps' },

        ],
      },
      Book: {
        // ref: '#',
        type: 'object',
        properties: {
          // id: {
          //   type: 'string',
          // },
          isbn: {
            type: 'string',
            description: 'isbn serial number of the book',
          },
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          images: {
            type: 'array',
            items: {
              type: 'string',
              format: 'uri-reference',
            },
          },
          total_book: {
            type: 'integer',
            format: 'int32',
            minimum: 0,
          },
          stock: {
            type: 'integer',
            format: 'int32',
            minimum: 0,
          },
          author_id: {
            type: 'array',
            items: {
              type: 'string',
              format: 'uuid',
            },
          },
          category_id: {
            type: 'array',
            items: {
              type: 'string',
              format: 'uuid',
            },
          },
        },

        required: ['id', 'title', 'isbn'],
      },

      Timestamps: {
        type: 'object',
        properties: {
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      Id: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
        },
      },
      FullUser: {
        allOf: [
          { $ref: '#/components/schemas/Id' },
          { $ref: '#/components/schemas/User' },
          { $ref: '#/components/schemas/Timestamps' },
        ],
      },
      User: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          password: {
            type: 'string',
          },
        },
        required: ['name', 'email', 'password'],
      },
    },
    responses: {
      InternalServerError: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Internal Server Error',
                },
              },
            },
          },
        },
      },
      NotAuthorized: {
        description: 'Token required for access the resource',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Not Authorized',
                },
              },
            },
          },
        },
      },
      Forbidden: {
        description: 'The token is wrong or this resource is not allowed for this user role level',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Forbidden',
                },
              },
            },
          },
        },
      },
      BadRequest: {
        description: 'required properties are missing, or validation is failed. client error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Bad Request. property "name" are required',
                },
              },
            },
          },
        },
      },
      NotFound: {
        description: 'resource are not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: '{resource} not found',
                },
              },
            },
          },
        },
      },
    },

    securitySchemes: {
      jwt: {
        description: 'JWT token',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },

    parameters: {
      id: {
        name: 'id',
        in: 'query',
        description: 'The id',
      },
    },

    requestBodies: {
      book: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Book',
            },
          },
        },
        required: true,
      },
    },
  },

  paths: {
    '/books': {
      post: createBook,
      get: getBooks,
      put: updateBook,
      delete: deleteBook,
    },
    '/users': {
      post: createUser,
      // get: getBooks,
      // put: updateBook,
      // delete: deleteBook,
    },
  },
};

module.exports = apiDocumentation;
