const { project } = require('../db/models'); // Import project model from aggregated models
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

module.exports = { createProject };