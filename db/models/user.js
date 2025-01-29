'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');
const displayError = require('../../utils/displayError');

module.exports = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userType: {
    type: DataTypes.ENUM('0', '1', '2'),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'User type is required'
      },
      notEmpty: {
        msg: 'User type cannot be empty'
      },
    }
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'First name is required'
      },
      notEmpty: {
        msg: 'First name cannot be empty'
      },
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Last name is required'
      },
      notEmpty: {
        msg: 'Last name cannot be empty'
      },
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Email is required'
      },
      notEmpty: {
        msg: 'Email cannot be empty'
      },
      isEmail: {
        msg: 'Invalid email address'
      },
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Password is required'
      },
      notEmpty: {
        msg: 'Password cannot be empty'
      },
    }
  },
  // virtual field to confirm password before saving
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    set(value) {
      // validate password length
      if (this.password.length < 7) {
        throw new displayError('Password must be at least 8 characters long',
          400
        );
      }

      // validate password confirmation
      if (value === this.password) {
        const hashPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashPassword);
      } else {
        throw new displayError('Password confirmation does not match password',
          400
        );
      }
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}, {
  paranoid: true,
  freezeTableName: true,
  modelName: 'user',
});