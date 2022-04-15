const createBook = {
  tags: ['Books'],
  description: 'Create a new book',

  security: {
    jwt: [],
  },

  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Book',
        },
      },
    },
    required: true,
  },

  responses: {
    201: {
      description: 'Book created successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/BookWithId',
          },
        },
      },
    },

    401: {
      $ref: '#/components/responses/NotAuthorized',
    },

    403: {
      $ref: '#/components/responses/Forbidden',
    },
    500: {
      $ref: '#/components/responses/InternalServerError',
    },
  },
};

const getBooks = {
  tags: ['Books'],
  description: 'Fetch books from the server',
  responses: {
    200: {
      description: 'Books fetched successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              books: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/BookWithId',
                },
              },
            },
          },
        },
      },
    },
    500: {
      $ref: '#/components/responses/InternalServerError',
    },
  },
};

// need book id, get from query
// need data to be updated, get from requestBody
// return updated data
// http type: 200, 400, 401, 403, 404, 500
const updateBook = {
  tags: ['Books'],

  description: 'Update a book',

  parameters: [
    { $ref: '#/components/parameters/id' },
  ],

  requestBody: {
    $ref: '#/components/requestBodies/book',
  },

  responses: {
    200: {
      description: 'Book updated successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              book: {
                $ref: '#/components/schemas/BookWithId',
              },
            },
          },
        },
      },
    },
    400: {
      $ref: '#/components/responses/BadRequest',
    },
    401: {
      $ref: '#/components/responses/NotAuthorized',
    },
    403: {
      $ref: '#/components/responses/Forbidden',
    },
    404: {
      $ref: '#/components/responses/NotFound',
    },
    500: {
      $ref: '#/components/responses/InternalServerError',
    },
  },

};

const deleteBook = {
  tags: ['Books'],

  description: 'Delete a book',

  parameters: [
    { $ref: '#/components/parameters/id' },
  ],

  responses: {
    200: {
      description: 'Book deleted successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              book: {
                $ref: '#/components/schemas/BookWithId',
              },
            },
          },
        },
      },
    },

    401: {
      $ref: '#/components/responses/NotAuthorized',
    },
    403: {
      $ref: '#/components/responses/Forbidden',
    },
    404: {
      $ref: '#/components/responses/NotFound',
    },
    500: {
      $ref: '#/components/responses/InternalServerError',
    },
  },

};

module.exports = {
  createBook,
  getBooks,
  updateBook,
  deleteBook,
};
