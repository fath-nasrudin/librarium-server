// req.body: name, email, password
// response: 200, 400, 500

const createUser = {
  tags: ['Users'],
  description: 'Register a user',
  requestBody: {
    description: 'data needed to create a user',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/User',
        },
      },
    },
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
  description: 'Authenticate a user / login',
  requestBody: {
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
  response: {
    content: {
      type: 'object',
    },
  },

};

module.exports = {
  createUser,
  authUser,
};
