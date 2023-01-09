const express = require('express');
const router = express.Router();

const CommentController = require('../controllers/CommentController');

// router.get('/', CommentController.getAllCategories);
// router.get('/:slug', CommentController.getOneCategory);
router.post('/', CommentController.commentVideo);

module.exports = router;