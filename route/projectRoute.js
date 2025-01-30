const router = require('express').Router();

const { authentication, restrictUser } = require('../controller/authController');
const { createProject, getProjects, getProjectById } = require('../controller/projectController');

router
  .route('/')
  .post(authentication, restrictUser('1'), createProject)
  .get(authentication, getProjects);

router.route('/:id').get(authentication, getProjectById);

module.exports = router;