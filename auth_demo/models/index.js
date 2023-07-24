const config = require('../config/db.config.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port
  }
)

const db = {Sequelize, sequelize}

db.user = require('../models/user.model.js')(sequelize, Sequelize)
db.role = require('../models/role.model.js')(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
  through: 'user_roles'
})

db.user.belongsToMany(db.role, {
  through: 'user_roles'
})

db.ROLES = ['user', 'admin', 'moderator']

module.exports = db
