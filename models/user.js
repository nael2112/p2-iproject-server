'use strict';
const { hashSync } = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Watchlist)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username cannot be empty"
        },
        notEmpty: {
          msg: "Username cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email cannot be empty"
        },
        isEmail: {
          msg: "Must be in standard email format"
        },
        notEmpty: {
          msg: "Email cannot be empty"
        }
      },
      unique: {
        msg: "Email must be unique"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be empty"
        },
        notEmpty: {
          msg: "Password cannot be empty"
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate (instance) {
        instance.password = hashSync(instance.password, 10)
      }
    },
    modelName: 'User',
  });
  return User;
};