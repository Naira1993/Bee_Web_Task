const sequelize = require('../utils/database')
const { Sequelize, DataTypes } = require('sequelize')

const Workspace = sequelize.define('workspace', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1
    },
    name: DataTypes.STRING,
    displayName: {
        type: DataTypes.STRING,
        unique: true
    },
    ownerId: DataTypes.STRING,
    user_email: DataTypes.STRING,
    users: {
        type: DataTypes.TEXT,
        get: function () {
            return JSON.parse(this.getDataValue('users'));
        },
        set: function (val) {
            return this.setDataValue('users', JSON.stringify(val));
        }
    }
}
)

module.exports = Workspace