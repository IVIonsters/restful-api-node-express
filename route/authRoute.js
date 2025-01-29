const router = require('express').Router();
const { signup, login } = require('../controller/authController'); // import signup

router.route('/signup').post(signup);

router.route('/login').post(login);

module.exports = router;