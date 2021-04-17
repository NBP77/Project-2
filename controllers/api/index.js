const router = require('express').Router();

const userRoute = require('./user-routes');
const eventRoute = require('./event-routes');


const dishRoutes = require('./dish-routes');

router.use('/dish', dishRoutes);


router.use('/users', userRoute);
router.use('/event', eventRoute);

module.exports = router;
