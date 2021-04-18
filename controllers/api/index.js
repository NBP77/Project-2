const router = require('express').Router();

const userRoute = require('./user-routes');
const eventRoute = require('./event-routes');
const dishRoutes = require('./dish-routes');

router.use('/users', userRoute);
router.use('/event', eventRoute);
router.use('/dish', dishRoutes);

module.exports = router;
