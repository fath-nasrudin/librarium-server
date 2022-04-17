const createAuthor = {
  tags: ['Authors'],

  description: 'Create an author of a book. Access Level: **admin**',

  requestBody: { $ref: '#/components/requestBodies/author' },

  responses: {
    201: {
      description: 'Success created Author',
      allOf: [{ $ref: '#/components/responses/author' }],
    },
    allOf: [{ $ref: '#/components/responses/errorPrivatePost' }],
  },
};
const getAuthors = {
  tags: ['Authors'],

  description: 'fetch all authors. Access level: **admin**',

  responses: {
    200: {
      description: 'Success fetch all authors',
      allOf: [{ $ref: '#/components/responses/authors' }],
    },
    allOf: [{ $ref: '#/components/responses/errorPrivateGet' }],
  },

};
const updateAuthor = {
  tags: ['Authors'],

  description: 'update an author based on the id. access level: **admin**',

  parameters: {
    description: 'author\'s id',
    allOf: [{ $ref: '#/components/parameters/id' }],
  },

  requestBody: {
    allOf: [{ $ref: '#/components/requestBodies/author' }],
  },

  responses: {
    200: {
      description: 'success updated the author',
      allOf: [{ $ref: '#/components/responses/author' }],
    },
    allOf: [{ $ref: '#/components/responses/errorPrivatePost' }],
  },

};
const deleteAuthor = {
  tags: ['Authors'],

  description: 'delete an author based on the id. access level: **admin**',

  parameters: {
    description: 'author\'s id',
    allOf: [{ $ref: '#/components/parameters/id' }],
  },

  responses: {
    200: {
      description: 'success deleted the author',
      allOf: [{ $ref: '#/components/responses/id' }],
    },
    allOf: [{ $ref: '#/components/responses/errorPrivateGet' }],
  },

};

module.exports = {
  createAuthor,
  getAuthors,
  updateAuthor,
  deleteAuthor,
};
