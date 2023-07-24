const dbContext = require('../database/db')

hasRole = (req, roles) => {
  console.log(roles)
  console.log(req.userRoles)
  for (let i = 0; i < req.userRoles.length; ++i) {
    if (roles.includes(req.userRoles[i])) {
      return true
    }
  }

  return false
}

isAdminOrModerator = (req) => {
  return hasRole(req, ['admin', 'moderator'])
}


userHasRightsToChangePost = async (req, res, next) => {
  if (isAdminOrModerator(req)
    || await dbContext.isUserPostOwner(req.userId, req.params.id)) {
    return next()
  }

  res.status(403).json({ message: "You have not rights to change this post." })
}

module.exports = {
  userHasRightsToChangePost
}
