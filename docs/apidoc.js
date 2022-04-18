const {
  createAuthor, getAuthors, updateAuthor, deleteAuthor,
} = require('./authors');
const {
  createBook, getBooks, updateBook, deleteBook,
} = require('./books');
const {
  createCategory, getCategories, updateCategory, deleteCategory,
} = require('./categories');
const me = require('./me');
const {
  createTransaction, getTransactions, updateTransaction, deleteTransaction,
} = require('./transactions');
const {
  createUser, authUser, getUsers, updateUser, deleteUser, createUserAdmin,
} = require('./users');

const apiDocumentation = {
  openapi: '3.0.2',

  info: {
    version: '1.0.0',
    title: 'Librarium - API Documentation',
    description: 'This app is a prototype. Here is documentation to access Librarium API. There are three level of authorization: **Public**, **user**, **admin**.   the admin account is created in the system level. this is the account to access admin level resource. **email: admin@admin.com**, **password: rahasia**',
    contact: {
      name: 'Fathurrohman Nasrudin',
      email: 'fath.nasrudin@gmail.com',
      url: '-',
    },
  },

  security: {
    jwt: [],
  },

  servers: [
    {
      url: 'https://librarium-server.herokuapp.com/api',
      description: 'Online Server',
    },
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
      description: 'Access Level: **public, admin**',
    },

    {
      name: 'Me',
      description: 'Access Level: **user**',
    },

    {
      name: 'Transactions',
      description: 'Access Level: **admin**',
    },
    {
      name: 'Authors',
      description: 'Access Level: **admin**',
    },
    {
      name: 'Categories',
      description: 'Access Level: **admin**',
    },
  ],

  components: {
    hiddenSchemas: {
      Id: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
        },
      },
      Token: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
          },
        },
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
      Name: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
        },
      },
      BookOnly: {
        type: 'object',
        properties: {
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
            description: 'Not yet implemented',
          },
          publishedYear: {
            type: 'integer',
            format: 'int32',
          },
          totalBook: {
            type: 'integer',
            format: 'int32',
            minimum: 0,
          },
          stock: {
            type: 'integer',
            format: 'int32',
            minimum: 0,
          },
          authors: {
            type: 'array',
            items: {
              $ref: '#/components/hiddenSchemas/Id',
            },
          },
          categories: {
            type: 'array',
            items: {
              $ref: '#/components/hiddenSchemas/Id',
            },
          },
        },

      },
      UserOnly: {
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
      },
      TransactionOnly: {
        type: 'object',
        properties: {
          user: {
            type: 'array',
            items: {
              $ref: '#/components/hiddenSchemas/Id',
            },
          },
          book: {
            type: 'array',
            items: {
              $ref: '#/components/hiddenSchemas/Id',
            },
          },
          status: {
            type: 'string',
            enum: [
              'booked',
              'borrowed',
              'returned',
              'cancelled',
            ],
          },
          bookDate: {
            type: 'string',
            format: 'date-time',
          },
          borrowDate: {
            type: 'string',
            format: 'date-time',
          },
          returnDate: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      AuthorOnly: {
        allOf: [{ $ref: '#/components/hiddenSchemas/Name' }],
      },
      CategoryOnly: {
        allOf: [{ $ref: '#/components/hiddenSchemas/Name' }],
      },
    },
    schemas: {
      Book: {
        allOf: [

          { $ref: '#/components/hiddenSchemas/Id' },
          { $ref: '#/components/hiddenSchemas/BookOnly' },
          { $ref: '#/components/hiddenSchemas/Timestamps' },
        ],
      },
      User: {
        allOf: [
          { $ref: '#/components/hiddenSchemas/Id' },
          { $ref: '#/components/hiddenSchemas/UserOnly' },
          { $ref: '#/components/hiddenSchemas/Timestamps' },
        ],
      },
      Author: {
        allOf: [
          { $ref: '#/components/hiddenSchemas/Id' },
          { $ref: '#/components/hiddenSchemas/Name' },
          { $ref: '#/components/hiddenSchemas/Timestamps' },
        ],
      },
      Category: {
        allOf: [
          { $ref: '#/components/hiddenSchemas/Id' },
          { $ref: '#/components/hiddenSchemas/CategoryOnly' },
          { $ref: '#/components/hiddenSchemas/Timestamps' },
        ],
      },
      Transaction: {
        allOf: [
          { $ref: '#/components/hiddenSchemas/Id' },
          { $ref: '#/components/hiddenSchemas/TransactionOnly' },
          { $ref: '#/components/hiddenSchemas/Timestamps' },
        ],

      },

    },
    responses: {
      errorResponses: {
        400: { $ref: '#/components/responses/BadRequest' },
        401: { $ref: '#/components/responses/NotAuthorized' },
        403: { $ref: '#/components/responses/Forbidden' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' },
      },
      errorPublicGet: {
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' },
      },
      errorPrivateGet: {
        401: { $ref: '#/components/responses/NotAuthorized' },
        403: { $ref: '#/components/responses/Forbidden' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' },
      },
      errorPublicPost: {
        400: { $ref: '#/components/responses/BadRequest' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' },
      },
      errorPrivatePost: {
        400: { $ref: '#/components/responses/BadRequest' },
        401: { $ref: '#/components/responses/NotAuthorized' },
        403: { $ref: '#/components/responses/Forbidden' },
        404: { $ref: '#/components/responses/NotFound' },
        500: { $ref: '#/components/responses/InternalServerError' },
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
                  example: 'Not Authorized. Need JWT token',
                },
              },
            },
          },
        },
      },
      Forbidden: {
        description: 'the resource is not allowed for this user role level',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Forbidden. Your role is not allowed to access this resource',
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
                  example: 'Bad Request. all required fields need to be filled',
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

      id: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      book: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                book: {
                  $ref: '#/components/schemas/Book',
                },
              },
            },
          },
        },
      },
      books: {
        description: 'Books fetched successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                books: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Book',
                  },
                },
              },
            },
          },
        },
      },
      author: {
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Author' },
          },
        },
      },
      authors: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                books: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Author',
                  },
                },
              },
            },
          },
        },
      },
      user: {
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/User' },
          },
        },
      },
      userWithToken: {
        content: {
          'application/json': {
            schema: {
              allOf: [
                { $ref: '#/components/schemas/User' },
                { $ref: '#/components/hiddenSchemas/Token' },
              ],
            },
          },
        },
      },
      users: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                users: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
        },
      },
      transaction: {
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Transaction' },
          },
        },
      },
      transactions: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                transactions: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Transaction',
                  },
                },
              },
            },
          },
        },
      },
      category: {
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Category' },
          },
        },
      },
      categories: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                transactions: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Category',
                  },
                },
              },
            },
          },
        },
      },

    },

    securitySchemes: {
      jwt: {
        description: 'JWT token. to get JWT token, you need to log in. To access admin level resources, you need to login with admin role\'s account ',
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
              allOf: [
                { $ref: '#/components/hiddenSchemas/BookOnly' },
              ],
              required: ['isbn', 'title'],

            },
          },
        },
        required: true,
      },
      author: {
        content: {
          'application/json': {
            schema: {
              allOf: [{ $ref: '#/components/hiddenSchemas/Name' }],
              required: ['name'],
            },

          },
        },
      },
      user: {
        content: {
          'application/json': {
            schema: {
              allOf: [{ $ref: '#/components/hiddenSchemas/UserOnly' }],
            },
          },
        },
      },
      userLogin: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                },
                password: {
                  type: 'string',
                },
              },
              required: ['email', 'password'],
            },
          },
        },
      },
      transaction: {
        content: {
          'application/json': {
            schema: {
              allOf: [{ $ref: '#/components/hiddenSchemas/TransactionOnly' }],
              required: ['user', 'book'],
            },

          },
        },
      },
      category: {
        content: {
          'application/json': {
            schema: {
              allOf: [{ $ref: '#/components/hiddenSchemas/CategoryOnly' }],
            },
          },
        },
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
      get: getUsers,
      put: updateUser,
      delete: deleteUser,
    },
    '/users/register': {
      post: createUser,
      // get: getBooks,
      // put: updateBook,
      // delete: deleteBook,
    },
    '/users/login': {
      post: authUser,
      // get: getBooks,
      // put: updateBook,
      // delete: deleteBook,
    },
    '/users/admin/register': {
      post: createUserAdmin,
    },
    '/authors': {
      post: createAuthor,
      get: getAuthors,
      put: updateAuthor,
      delete: deleteAuthor,
    },
    '/me': {
      get: me.getUser,
      put: me.updateUser,
      delete: me.deleteUser,

    },
    'me/transactions': {
      get: me.getTransactions,
      post: me.createTransaction,
    },

    '/transactions': {
      post: createTransaction,
      get: getTransactions,
      put: updateTransaction,
      delete: deleteTransaction,
    },
    '/categories': {
      post: createCategory,
      get: getCategories,
      put: updateCategory,
      delete: deleteCategory,
    },
  },
};

module.exports = apiDocumentation;
