const createCategory = {
  tags: ['Categories'],

  description: 'add a category for books.',

  requestBody: { $ref: '#/components/requestBodies/category' },

  responses: {
    201: {
      description: 'Success created Category',
      allOf: [{ $ref: '#/components/responses/category' }],
    },
    allOf: [{ $ref: '#/components/responses/errorPrivatePost' }],
  },
};

const getCategories = {
  tags: ['Categories'],

  description: 'get all categories.',

  responses: {
    200: {
      description: 'Success fetched Categorie',
      allOf: [{ $ref: '#/components/responses/categories' }],
    },
    allOf: [{ $ref: '#/components/responses/errorPrivateGet' }],
  },
};

const updateCategory = {
  tags: ['Categories'],

  description: 'update a category.',

  requestBody: { $ref: '#/components/requestBodies/category' },

  parameters: {
    description: 'Category\'s id',
    allOf: [{ $ref: '#/components/parameters/id' }],
  },

  responses: {
    200: {
      description: 'Success updated Category',
      allOf: [{ $ref: '#/components/responses/category' }],
    },
    allOf: [{ $ref: '#/components/responses/errorPrivatePost' }],
  },
};

const deleteCategory = {
  tags: ['Categories'],

  description: 'delete a category based on id in query.',

  parameters: {
    description: 'Category\'s id',
    allOf: [{ $ref: '#/components/parameters/id' }],
  },

  responses: {
    200: {
      description: 'Success deleted Category',
      allOf: [{ $ref: '#/components/responses/id' }],
    },
    allOf: [{ $ref: '#/components/responses/errorPrivateGet' }],
  },
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
