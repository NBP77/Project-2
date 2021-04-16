const router = require('express').Router();
const sequelize = require('../config/connection');
const { Event, User } = require('../models');
const withLoggedIn = require('../utils/auth');
router.get('/', withLoggedIn, (req, res) => {
    Event.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(eventData => {
            const events = eventData.map(event => event.get({ plain: true }));
            res.render('dashboard', { events, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/edit/:id', withLoggedIn, (req, res) => {
    Event.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
            ]
        })
        .then(dbEventData => {
            if (!dbEventData) {
                res.status(404).json({ message: 'Sorry no event with that Id' });
                return;
            }

            const event = eventData.get({ plain: true });
            res.render('edit-event', { event, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})
router.get('/new', (req, res) => {
    res.render('new-event');
});



module.exports = router;