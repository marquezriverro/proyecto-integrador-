'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Admin.hasMany(models.Token, {
                onDelete: 'cascade'
            })
        }
    };
    Admin.init({
        fullName: DataTypes.STRING,
        email: DataTypes.STRING,
        phoneNumber: DataTypes.FLOAT,
        password: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Admin',
    });
    return Admin;
};