const express = require('express'); //express library
const router = express.Router(); //express router for defining routes
const authControllers = require('../controllers/authControllers') //importing the auth controllers for handling authentication logic
router.post('/register', authControllers.register) //route for doctor registration
router.post('/login', authControllers.login) //route for doctor login



module.exports = router; //export the router to be used in the main app