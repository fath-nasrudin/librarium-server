// const { connectDB, disconnectDB } = require('.');
const Role = require('../../models/role');
const logger = require('../logging/logger');

const roles = [
  'user',
  'admin',
];

const seedingRoles = async () => {
  try {
    // await connectDB();
    logger.info('try to seeding roles...');

    const totalRoles = await Role.estimatedDocumentCount();
    if (totalRoles === 0) {
      const formattedRoles = roles.map((role) => ({ name: role }));

      const insertedRoles = await Role.insertMany(formattedRoles);

      if (!insertedRoles) {
        logger.error('failed to seeding roles');
        process.exit(1);
      }
      logger.info('Success seeding roles');
    } else {
      logger.info('roles already seeded before');
    }

    // await disconnectDB();
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

module.exports = seedingRoles;
