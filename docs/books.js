const createBook = {
  tags: ['Books'],
  description: 'Create a new book. **Access level: admin**',

  requestBody: {
    $ref: '#/components/requestBodies/book',
  },

  responses: {
    201: {
      description: 'Book created successfully',
      allOf: [{ $ref: '#/components/responses/book' }],
    },

    allOf: [{ $ref: '#/components/responses/errorPrivatePost' }],
  },
};

// public
const getBooks = {
  tags: ['Books'],
  description: 'Fetch books from the server. **Access level: public**',
  security: {},
  responses: {
    200: {
      description: 'Books fetched successfully',
      allOf: [{ $ref: '#/components/responses/books' }],
    },
    allOf: [{ $ref: '#/components/responses/errorPublicGet' }],
  },
};

const updateBook = {
  tags: ['Books'],

  description: 'Update a book. **Access level: admin**',

  parameters: [
    {
      allOf: [{ $ref: '#/components/parameters/id' }],
      description: 'The book id',
    },
  ],

  requestBody: {
    allOf: [{ $ref: '#/components/requestBodies/book' }],
    required: [],

  },

  responses: {
    200: {
      description: 'Book updated successfully!',
      allOf: [{ $ref: '#/components/responses/book' }],
    },
    allOf: [{ $ref: '#/components/responses/errorPrivatePost' }],
  },

};

const deleteBook = {
  tags: ['Books'],

  description: 'Delete a book. **Access level: admin**',

  parameters: [
    {
      allOf: [{ $ref: '#/components/parameters/id' }],
      description: 'The book id',
    },
  ],

  responses: {
    200: {
      description: 'Book deleted successfully!',
      allOf: [{ $ref: '#/components/responses/id' }],
    },

    allOf: [{ $ref: '#/components/responses/errorPrivateGet' }],
  },

};

module.exports = {
  createBook,
  getBooks,
  updateBook,
  deleteBook,
};
