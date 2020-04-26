const sequelize = require('../utils/database')
const { Sequelize,  DataTypes } = require('sequelize')

const User = sequelize.define('messages', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1
    },
    user_id: DataTypes.STRING,
    user_name: DataTypes.STRING,
    workspace_id: DataTypes.STRING,
    text: DataTypes.TEXT
}
);

module.exports = User