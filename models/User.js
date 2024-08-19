'use strict';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    contact: DataTypes.STRING,
    gender: DataTypes.STRING,
    country: DataTypes.STRING,
    otp: DataTypes.STRING,
    otpExpiration: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};