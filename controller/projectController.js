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
  const result = await project.findAll({
    include: {
      model: user,
      as: 'user', // Specify the alias used in the association
    },
  });

  res.status(200).json({
    status: 'success',
    data: result,
  });
});

// get project by id
const getProjectById = catchErrors(async (req, res, next) => {
  const projectId = req.params.id;
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

module.exports = { createProject, getProjects, getProjectById };