const { project, user } = require('../db/models'); // Import project and user models from aggregated models
const catchErrors = require('../utils/catchErrors'); // Import catchErrors

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

module.exports = { createProject, getProjects };