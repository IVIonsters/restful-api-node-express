const router = require('express').Router();

const { authentication } = require('../controller/authController');
const { createProject } = require('../controller/projectController');

router.route('/').post(authentication, createProject);

module.exports = router;