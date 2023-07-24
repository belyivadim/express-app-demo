const express = require("express")
const authJwt = require("../middleware/authJwt");
const verefication = require('../middleware/verefication')
const router = express.Router()
const postController = require('../controllers/post.controller')

router.post('/', [authJwt.verifyToken], postController.createPost)
router.get('/', postController.getAllPosts)

router
  .route('/:id')
  .get(postController.getOnePost)
  .put([authJwt.verifyToken, verefication.userHasRightsToChangePost], postController.updatePost)
  .delete([authJwt.verifyToken, authJwt.isAdminOrModerator], postController.deletePost)

module.exports = router
