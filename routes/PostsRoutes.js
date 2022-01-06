const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/PostsController");

router.get("/", PostsController.getAllPosts);
router.get("/favoris-posts", PostsController.getAllFavorisPosts);
router.get("/recent-post", PostsController.getAllRrecentPosts);
router.get("/:slug", PostsController.getOnePost);
router.post("/", PostsController.createPost);

module.exports = router;