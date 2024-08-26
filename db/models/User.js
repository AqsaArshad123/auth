"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp: {
        type: DataTypes.STRING,
      },
      otpExpiration: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
