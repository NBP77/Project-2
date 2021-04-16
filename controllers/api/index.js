const router = require('express').Router();

const userRoute = require('./user-routes');
const eventRoute = require('./event-routes');

router.use('/users', userRoute);
router.use('/event', eventRoute);

module.exports = router;
