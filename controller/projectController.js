const { project, user } = require('../db/models'); // Import project and user models from aggregated models
const catchErrors = require('../utils/catchErrors'); // Import catchErrors
const displayError = require('../utils/displayError');

const createProject = catchErrors(async (req, res, next) => {
  const body = req.body;
  const userId = req.user.id;

  const newProject = await project.create({
    title: body.title,
    productImage: body.productImage,
    price: body.price,
    shortDescription: body.shortDescription,
    description: body.description,
    productUrl: body.productUrl,
    category: body.category,
    tags: body.tags,
    createdBy: userId,
  });

  res.status(201).json({
    status: 'success',
    data: newProject,
  });
});

// retrieve all projects
const getProjects = catchErrors(async (req, res, next) => {
  const userId = req.user.id;
  const result = await project.findAll({
    include: {
      model: user,
      as: 'user', // Specify the alias used in the association
      where: { id: userId },
    },
    where: { createdBy: userId },
  });

  return res.json({
    status: 'success',
    data: result,
  });
});

// get project by id
const getProjectById = catchErrors(async (req, res, next) => {
  const projectId = parseInt(req.params.id, 10); // Ensure projectId is an integer
  if (isNaN(projectId)) {
    return next(new displayError('Invalid project id', 400));
  }

  const result = await project.findByPk(projectId, {
    include: {
      model: user,
      as: 'user', // Specify the alias used in the association
    },
  });
  if (!result) {
    return next(new displayError('Invalid project id', 400));
  }
  return res.json({
    status: 'success',
    data: result,
  });
});

// update project
const updateProject = catchErrors(async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.params.id;
  const body = req.body;

  const result = await project.findOne({ where: { id: projectId, createdBy: userId } });
  if (!result) {
    return next(new displayError('Invalid project id', 400));
  }
  result.title = body.title;
  result.productImage = body.productImage;
  result.price
  result.shortDescription = body.shortDescription;
  result.description = body.description;
  result.productUrl = body.productUrl;
  result.category = body.category;
  result.tags = body.tags;

  const updatedResult = await result.save();

  return res.json({
    status: 'success',
    data: updatedResult,
  });
});

//Delete project
const deleteProject = catchErrors(async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.params.id;
  const body = req.body;

  const result = await project.findOne({ where: { id: projectId, createdBy: userId } });
  if (!result) {
    return next(new displayError('Invalid project id', 400));
  }

  await result.destroy();

  return res.json({
    status: 'success',
    message: 'Project deleted successfully',
  });
});
module.exports = { createProject, getProjects, getProjectById, updateProject, deleteProject };