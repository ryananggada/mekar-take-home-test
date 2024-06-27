'use strict';
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
    }
  }
  User.init({
    name: DataTypes.STRING,
    identity_number: DataTypes.STRING,
    email: DataTypes.STRING,
    date_of_birth: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};