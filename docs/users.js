// req.body: name, email, password
// response: 200, 400, 500

const createUser = {
  tags: ['Users'],

  description: 'Register a user. Access Level: **public**',

  security: {},

  requestBody: {
    description: 'data needed to create a user',
    allOf: [{ $ref: '#/components/requestBodies/user' }],
  },

  responses: {
    201: {
      description: 'Success create user',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
            },
            example: {
              message: 'success registered. please login',
            },
          },
        },
      },
    },
    400: {
      $ref: '#/components/responses/BadRequest',
    },
    500: {
      $ref: '#/components/responses/InternalServerError',
    },
  },
};

const createUserAdmin = {
  tags: ['Users'],

  description: 'Register a user with role **admin**. This endpoint will have public access just for temporary. Access Level: **public**',

  security: {},

  requestBody: {
    description: 'data needed to create a user',
    allOf: [{ $ref: '#/components/requestBodies/user' }],
  },

  responses: {
    201: {
      description: 'Success create user',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
              },
            },
            example: {
              message: 'success registered. please login',
            },
          },
        },
      },
    },
    400: {
      $ref: '#/components/responses/BadRequest',
    },
    500: {
      $ref: '#/components/responses/InternalServerError',
    },
  },
};

// req.body: email, password
// http: 200, 400, 500
// response: user_data, token
// public

const authUser = {
  tags: ['Users'],

  description: 'Authenticate a user / login. Access Level: **public**',

  security: {},

  requestBody: {
    $ref: '#/components/requestBodies/userLogin',
  },

  responses: {
    200: {
      description: 'User logged in',
      allOf: [
        { $ref: '#/components/responses/userWithToken' },
      ],
    },
    allOf: [{ $ref: '#/components/responses/errorPublicPost' }],
  },

};

const getUsers = {
  tags: ['Users'],

  description: 'get all users. Access level: **admin**',

  responses: {
    200: { $ref: '#/components/responses/users' },
    allOf: [{ $ref: '#/components/responses/errorPrivateGet' }],
  },

};

const updateUser = {
  tags: ['Users'],

  description: 'Update user. Access level: **admin**',

  parameters: [{
    description: 'user\'s id',
    allOf: [{ $ref: '#/components/parameters/id' }],
  }],

  requestBody: {
    $ref: '#/components/requestBodies/user',
  },

  responses: {
    200: { $ref: '#/components/responses/user' },
    allOf: [{ $ref: '#/components/responses/errorPrivatePost' }],
  },

};

const deleteUser = {
  tags: ['Users'],

  description: 'delete a user based on its id. Access level: **admin**',

  parameters: [{
    description: 'user\'s id',
    allOf: [{ $ref: '#/components/parameters/id' }],
  }],

  responses: {
    200: {
      description: 'success deleted the user',
      allOf: [{ $ref: '#/components/responses/id' }],
    },
    allOf: [{ $ref: '#/components/responses/errorPrivateGet' }],
  },

};

module.exports = {
  createUser,
  createUserAdmin,
  authUser,
  getUsers,
  updateUser,
  deleteUser,
};
