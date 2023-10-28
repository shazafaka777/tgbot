const sequelize = require('./db');
const { Sequelize, DataTypes} = require('sequelize');

const UserModel = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    chatId: {type: DataTypes.STRING, unique: true},
    right: {type: DataTypes.INTEGER, defaultValue: 0},
    wrong: {type: DataTypes.INTEGER, defaultValue: 0}
});

module.exports = UserModel;