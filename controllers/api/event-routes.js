const router = require('express').Router();
const { Event, User } = require('../../models');
const sequelize = require('../../config/connection');
const eventData = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
            attributes: ['id',
                'title',
                'content',
                'created_at'
            ],
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
            ]
        })
        .then(eventData => res.json(eventData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});
router.get('/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'content',
                'title',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
            ]
        })
        .then(eventData => {
            if (!eventData) {
                res.status(404).json({ message: 'Sorry no event with that Id' });
                return;
            }
            res.json(eventData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', eventData, (req, res) => {
    Event.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        .then(eventData => res.json(eventData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', eventData, (req, res) => {
    Post.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        }).then(eventData => {
            if (!eventData) {
                res.status(404).json({ message: 'Sorry no event with that Id' });
                return;
            }
            res.json(eventData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.delete('/:id', eventData, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(eventData => {
        if (!eventData) {
            res.status(404).json({ message: 'Sorry no event with that Id' });
            return;
        }
        res.json(eventData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;