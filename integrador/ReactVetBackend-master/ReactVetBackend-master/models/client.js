'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Client extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Client.hasMany(models.Appointment,{
                onDelete: 'cascade'
            })
            Client.hasMany(models.Token,{
                onDelete: 'cascade'
            })
            Client.hasMany(models.pets,{
                onDelete: 'cascade'
            })
            
        }
    };
    Client.init({
        fullName: DataTypes.STRING,
        email: DataTypes.STRING,
        phoneNumber: DataTypes.INTEGER,
        password: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Client',
    });
    
    return Client;
};

