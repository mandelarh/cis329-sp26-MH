const express = require('express'); //express library
const router = express.Router(); //express router for defining routes

router.post('/register', authControllers.register) //route for doctor registration



module.exports = router; //export the router to be used in the main app