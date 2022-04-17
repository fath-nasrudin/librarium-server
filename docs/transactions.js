// Level Access: admin

const createTransaction = {
  tags: ['Transactions'],

  description: 'Create a transaction',

  requestBody: {
    $ref: '#/components/requestBodies/transaction',
  },

  responses: {
    201: { $ref: '#/components/responses/transaction' },
    allOf: [{ $ref: '#/components/responses/errorPrivatePost' }],
  },
};

const getTransactions = {
  tags: ['Transactions'],

  description: 'fetch all transactions',

  responses: {
    200: { $ref: '#/components/responses/transactions' },
    allOf: [{ $ref: '#/components/responses/errorPrivateGet' }],
  },
};

const updateTransaction = {
  tags: ['Transactions'],

  description: 'Update a transaction',

  parameters: [{
    allOf: [{ $ref: '#/components/parameters/id' }],
    description: 'The transaction id',
  }],

  requestBody: {
    $ref: '#/components/requestBodies/transaction',
  },

  responses: {
    200: { $ref: '#/components/responses/transaction' },
    allOf: [{ $ref: '#/components/responses/errorPrivatePost' }],
  },
};

const deleteTransaction = {
  tags: ['Transactions'],

  description: 'Delete a transaction',

  parameters: [{
    allOf: [{ $ref: '#/components/parameters/id' }],
    description: 'The transaction id',
  }],

  responses: {
    200: { $ref: '#/components/responses/id' },
    allOf: [{ $ref: '#/components/responses/errorPrivateGet' }],
  },
};

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
