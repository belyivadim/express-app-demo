const db = require('../models')
const config = require('../config/auth.config')
const User = db.user
const Role = db.role


const Op = db.Sequelize.Op

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signup = async (req, res) => {
  // save user to db
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    })

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      })

      const result = user.setRoles(roles)

      if (result) {
        res.send({
          message: 'User registred successfully'
        })
      }
    } else {
      const result = user.setRoles([1])
      if (result) {
        res.send({
          message: 'User registred successfully',
          userId: user.id
        })
      }
    }
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    })

    if (!user) {
      return res.status(404).send({ message: 'User not found!'})
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    )

    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid password!' })
    }

    let authorities = []
    const roles = await user.getRoles()
    for (let i = 0; i < roles.length; ++i) {
      authorities.push(`${roles[i].name}`)
    }

    const token = jwt.sign(
      { id: user.id, roles: authorities },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400 // 24 hours
      }
    )


    //req.session.token = token

    return res.status(200).send({
      token
      // id: user.id,
      // username: user.username,
      // email: user.email,
      // roles: authorities
    })
  } catch (e) {
    return res.status(500).send({ message: e.message })
  }
}

exports.signout = async (req, res) => {
  try {
    req.session = null
    return res.status(200).send({
      message: 'You\'ve been signed out!'
    })
  } catch (e) {
    this.next(err)
  }
}
