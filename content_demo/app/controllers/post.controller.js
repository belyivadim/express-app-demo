const { response } = require('express')

dbContext = require('../database/db')

const sendResponse = (result, res) => {
  res
    .status(result.status)
    .json(result.body)
}

class PostController {
  

  async createPost(req, res) {
    const {title, content} = req.body
    sendResponse(await dbContext.createPost({title, content, userId: req.userId}), res)
  }

  async getAllPosts(req, res) {
    const userId = req.query.userId

    if (userId) {
      sendResponse(await dbContext.getPostsByUserId(userId), res)
    } else {
      sendResponse(await dbContext.getAllPosts(), res)

    }
  }

  async getOnePost(req, res) {
    const id = req.params.id
    sendResponse(await dbContext.getPostById(id), res)
  }

  async updatePost(req, res) {
    const {id, title, content} = req.body

    if (parseInt(req.params.id) !== id) {
      return res.status(400).json({ message: 'id parameter is not equal to id from body' })
    }

    sendResponse(await dbContext.updatePost({id, title, content}), res)
  }

  async deletePost(req, res) {
    const id = req.params.id
    sendResponse(await dbContext.deletePostById(id), res)
  }
}

module.exports = new PostController()
