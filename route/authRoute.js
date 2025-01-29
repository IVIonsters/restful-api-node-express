const router = require('express').Router();
const { signup } = require('../controller/authController'); // import signup

router.route('/signup').post(signup);

module.exports = router;