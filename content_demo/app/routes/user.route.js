const express = require("express")
const router = express.Router()
const userController = require('../controllers/user.controller')

router.post('/', userController.createUser)
router.get('/', userController.getAllUsers)
router.put('/', userController.updateUser)

router
  .route('/:id')
  .get(userController.getOneUser)
  .delete(userController.deleteUser)

module.exports = router
