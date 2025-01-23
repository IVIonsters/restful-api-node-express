require('dotenv').config({ path: `${process.cwd()}/.env` }); // import dotenv
const express = require('express');
const authRouter = require('./route/authRoute'); // import authRoute
const catchErrors = require('./utils/catchErrors');
const displayError = require('./utils/displayError');

const app = express();

app.use(express.json()); // parse json body

// test route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: "Hello World, RESTful API with Node.js, Express, and PostgreSQL"
  })
});

// all routes will here
app.use('/api/v1/auth', authRouter); // use authRoute

// if no route found - default error
app.use('*',
  catchErrors(async (req, res, next) => {
    throw new displayError('Error! Route not found', 404);
  })); // 404 route

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    // cannot display stack trace in production mode
    stack: err.stack,
  });
})

const PORT = process.env.APP_PORT || 4000; // set port

// listen to port
app.listen(PORT, () => {
  console.log('Server is running on ' + PORT);
});

// migration db and seed data
// npx sequelize-cli db:migrate
// npx sequelize-cli db:migrate:undo