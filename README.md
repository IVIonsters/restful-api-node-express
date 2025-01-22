# Node.js RESTful API with Express and PostgreSQL

This project is a RESTful API built with Node.js, Express, and PostgreSQL. It includes user authentication and basic CRUD operations.

## Features

- User authentication (signup and login)
- JWT token generation and validation
- CRUD operations for user management
- Environment configuration using dotenv

## Technologies Used

- Node.js
- Express
- PostgreSQL
- Sequelize (ORM)
- JWT (JSON Web Token)
- bcrypt (for password hashing)
- dotenv (for environment variables)

## Getting Started

### Prerequisites

- Node.js installed
- PostgreSQL installed and running

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/IVIonsters/restful-api-node-express.git
   cd restful-api-node-express
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a [.env](http://_vscodecontentref_/0) file in the root directory and add your environment variables:

   ```properties
   NODE_ENV=development
   APP_PORT=3000
   DB_USERNAME=postgres
   DB_PASSWORD=yourpassword
   DB_NAME=backend-setup
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=yourjwtsecret
   JWT_EXPIRES_IN=
   ```

4. Run database migrations:
   ```sh
   npx sequelize-cli db:migrate
   ```

### Running the Application

1. Start the server:

   ```sh
   npm start
   ```

2. The server will be running on `http://localhost:3000`.

### API Endpoints

- `POST /api/v1/auth/signup` - User signup
- `POST /api/v1/auth/login` - User login

### Example Request

#### Signup

```sh
POST /api/v1/auth/signup
Content-Type: application/json

{
    "userType": "1",
    "firstName": "James",
    "lastName": "Media",
    "email": "test@gmail.com",
    "password": "test123"
},
```

#### Login

```sh
POST /api/v1/auth/login
Content-Type: application/json

{
    "email": "test@gmail.com",
    "password": "test123"
}password": "test123"
},
```

#### License

This project is licensed under the MIT License
