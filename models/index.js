const databaseConfig = require('../config/config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: databaseConfig.pool.max,
        min: databaseConfig.pool.min,
        acquire: databaseConfig.pool.acquire,
        idle: databaseConfig.pool.idle
    },
    define: {
        timestamps: false
    },
    logging: false
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.team = require('./team.js')(Sequelize, sequelize);
db.todo = require('./todo.js')(Sequelize, sequelize);
db.users = require('./users.js')(Sequelize, sequelize);

module.exports = db;
