const router = require('express').Router();

const { authentication, restrictUser } = require('../controller/authController');
const { createProject, getProjects, getProjectById, updateProject, deleteProject } = require('../controller/projectController');

router
  .route('/')
  .post(authentication, restrictUser('1'), createProject)
  .get(authentication, restrictUser('1'), getProjects);

router.
  route('/:id')
  .get(authentication, restrictUser('1'), getProjectById)
  .patch(authentication, restrictUser('1'), updateProject)
  .delete(authentication, restrictUser('1'), deleteProject);

module.exports = router;