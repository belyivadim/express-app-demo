dbContext = require('../database/db')

class UserController {
  async createUser(req, res) {
    const {id, username} = req.body

    const result = await dbContext.createUser({id, username})

    res
      .status(result.status)
      .json(result.body)
  }

  async getAllUsers(req, res) {
    const result = await dbContext.getAllUsers()
    res
      .status(result.status)
      .json(result.body)
  }

  async getOneUser(req, res) {
    const id = req.params.id
    const result = await dbContext.getUserById(id)
    res
      .status(result.status)
      .json(result.body)
  }

  async updateUser(req, res) {
    const {username} = req.body
    const result = await dbContext.updateUser({id: req.userId, username})
    res
      .status(result.status)
      .json(result.body)
  }

  async deleteUser(req, res) {
    const id = req.params.id
    const result = await dbContext.deleteUserById(id)
    res
      .status(result.status)
      .json(result.body)
  }
}

module.exports = new UserController()
