// const sequelize = require('../config/connection');
// const seedPosts = require('./post-seeds');

// const seedAll = async () => {
//   await sequelize.sync({ force: true });

//   await seedPosts();

//   process.exit(0);
// };

// seedAll();

const sequelize = require('../config/connection');
const Dish = require('../models/Dish');
const dishData = require('./dish-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Dish.bulkCreate(dishData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();

