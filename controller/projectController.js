const project = require('../db/models/project'); // Import project model
const catchErrors = require('../utils/catchErrors'); // Import catchErrors

const createProject = catchErrors(async (req, res, next) => {
  const body = req.body;
  const newProject = await project.create({
    title: body.title,
    isFeatured: body.isFeatured,
    productImage: body.productImage,
    price: body.price,
    shortDescription: body.shortDescription,
    description: body.description,
    productUrl: body.productUrl,
    category: body.category,
    tags: body.tags,
    createdBy: 1,
  })

  res.status(201).json({
    status: 'success',
    data: newProject,
  });
});

module.exports = { createProject };