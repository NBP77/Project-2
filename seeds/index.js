const sequelize = require('../config/connection');
const Event = require('../models/Event');
const eventData = require('./event-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Event.bulkCreate(eventData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

