require('dotenv').config({ path: `${process.cwd()}/.env` }); // import dotenv
const express = require('express');
const authRouter = require('./route/authRoute'); // import authRoute
const projectRouter = require('./route/projectRoute'); // import projectRoute
const catchErrors = require('./utils/catchErrors');
const displayError = require('./utils/displayError');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.use(express.json()); // parse json body

// all routes will here
app.use('/api/v1/auth', authRouter); // use authRoute
app.use('/api/v1/projects', projectRouter); // use projectRoute

// if no route found - default error
app.use('*',
  catchErrors(async (req, res, next) => {
    throw new displayError(`Cannot find ${req.originalUrl} on server`, 404);
  })); // 404 route

// global error handler
app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 4000; // set port

// listen to port
app.listen(PORT, () => {
  console.log('Server is running on ' + PORT);
});

// migration db and seed data
// npx sequelize-cli db:migrate
// npx sequelize-cli db:migrate:undo
// npx sequelize-cli seed:generate --name demo-user
// npx sequelize-cli db:seed:all