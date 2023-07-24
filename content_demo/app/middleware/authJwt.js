const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')

verifyToken = (req, res, next) => {
  //let token = req.session.token
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    return res.status(401).send({
      message: 'Authoriztion header missing'
    })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!'
    })
  }
  
  jwt.verify(
    token,
    config.secret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: 'Unauthorized!'
        })
      }

      req.userId = decoded.id
      req.userRoles = decoded.roles

      next()
    }
  )
}

hasRoleMW = async (req, res, next, roles) => {
  for (let i = 0; i < req.userRoles.length; ++i) {
    if (roles.includes(req.userRoles[i])) {
      return next()
    }
  }

  return res.status(403).send({
    message: `Require ${roles} role!`
  })
}

isAdmin = async (req, res, next) => {
  await hasRoleMW(req, res, next, ['admin'])
}

isModerator = async (req, res, next) => {
  await hasRoleMW(req, res, next, ['moderator'])
}

isAdminOrModerator = async (req, res, next) => {
  await hasRoleMW(req, res, next, ['admin', 'moderator'])
}

module.exports = {
  verifyToken,
  isAdmin,
  isModerator,
  isAdminOrModerator
}
