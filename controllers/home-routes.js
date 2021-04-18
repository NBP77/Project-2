const sequelize = require('../config/connection');
const { Event, User } = require('../models');
const router = require('express').Router();
router.get('/', (req, res) => {
    Event.findAll({
            attributes: [
                'id',
                'date',
                'location',
                'venue',
                'created_at'
            ],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(eventData => {
            const events = eventData.map(event => event.get({ plain: true }));
            res.render('homepage', { events, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/event/:id', (req, res) => {
    Event.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'date',
                'location',
                'venue',
                'created_at'
            ],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(eventData => {
            if (!eventData) {
                res.status(404).json({ message: 'Sorry no event with that Id' });
                return;
            }
            const event = eventData.get({ plain: true });
            console.log(event);
            res.render('single-event', { event, loggedIn: req.session.loggedIn });


        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;