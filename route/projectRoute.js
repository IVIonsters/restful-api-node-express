const router = require('express').Router();

const { authentication, restrictUser } = require('../controller/authController');
const { createProject, getProjects } = require('../controller/projectController');

router.route('/').post(authentication, restrictUser('1'), createProject).get(authentication, getProjects);

module.exports = router;