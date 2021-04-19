const sequelize = require('../config/connection');
const { Event, User } = require('../models');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', { User, loggedIn: req.session.loggedIn });

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

const Dish = require('../models/Dish');

// route to get all dishes
router.get('/', async (req, res) => {
    const dishData = await Dish.findAll().catch((err) => { 
        res.json(err);
      });
        const dishes = dishData.map((dish) => dish.get({ plain: true }));
        res.render('all', { dishes });
      });
  
  // route to get one dish
  router.get('/dish/:id', async (req, res) => {
    try{ 
        const dishData = await Dish.findByPk(req.params.id);
        if(!dishData) {
            res.status(404).json({message: 'No dish with this id!'});
            return;
        }
        const dish = dishData.get({ plain: true });
        res.render('dish', dish);
      } catch (err) {
          res.status(500).json(err);
      };     
  });

module.exports = router;