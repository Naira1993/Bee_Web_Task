const Sequelize = require('sequelize');

const sequelize = new Sequelize('task_beeweb', 'root', 'yuri2019', {
    host: 'localhost',
    dialect:'mysql'
  });

  module.exports = sequelize