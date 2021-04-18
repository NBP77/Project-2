const sequelize = require('../config/connection');
const seedEvents = require('./event-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedEvents();

  process.exit(0);
};

seedAll();
