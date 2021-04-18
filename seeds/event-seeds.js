const { Event } = require('../models');

const eventData = [{
        date: '09/17/2021',
        location: 'Philly',
        venue: 'MET'
    },
  
];

const seedEvents = () => Event.bulkCreate(eventData);

module.exports = seedEvents;
