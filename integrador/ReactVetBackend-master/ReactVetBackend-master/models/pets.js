'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pets.belongsTo(models.Client,{
        foreignKey: {
          allowNull: false
      }
    })
    }
  };
  pets.init({
    animal: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pets',
  });
  return pets;
};