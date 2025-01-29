const router = require('express').Router();

const { createProject } = require('../controller/projectController');

router.route('/').post(createProject);

module.exports = router;