// private
// response:
const getUser = {
  tags: ['Me'],

  description: 'Get the user data. Access Level: **user**',

  responses: {
    200: { $ref: '#/components/responses/user' },
    allOf: [{ $ref: '#/components/responses/errorPrivateGet' }],
  },
};
const updateUser = {
  tags: ['Me'],

  description: 'update the user data. Access Level: **user**',

  requestBody: { $ref: '#/components/requestBodies/user' },

  responses: {
    200: { $ref: '#/components/responses/user' },
    allOf: [{ $ref: '#/components/responses/errorPrivatePost' }],
  },

};
const deleteUser = {
  tags: ['Me'],

  description: 'Delete account. Access Level: **user**',

  responses: {
    200: { $ref: '#/components/responses/id' },
    allOf: [{ $ref: '#/components/responses/errorPrivateGet' }],
  },

};
const getTransactions = {
  tags: ['Me'],

  description: 'Get the user transactions. Access Level: **user**',

  responses: {
    200: { $ref: '#/components/responses/transactions' },
    allOf: [{ $ref: '#/components/responses/errorPrivateGet' }],
  },

};
const createTransaction = {
  tags: ['Me'],

  description: 'create transaction for the user. the status option is only "booked". Access Level: **user**',

  requestBody: { $ref: '#/components/requestBodies/transaction' },

  responses: {
    200: { $ref: '#/components/responses/transaction' },
    allOf: [{ $ref: '#/components/responses/errorPrivatePost' }],
  },

};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  getTransactions,
  createTransaction,
};
