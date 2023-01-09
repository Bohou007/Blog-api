const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/PostsController");

router.get("/", PostsController.getAllPosts);
router.get("/favoris-posts/:user_id", PostsController.getAllFavorisPosts);
router.get("/recent-post", PostsController.getAllRrecentPosts);
router.get("/popular-post", PostsController.getPopularPosts);
router.get("/:slug", PostsController.getOnePost);
router.put("/:slug", PostsController.updatePost);
router.post("/", PostsController.createPost);

router.put("/liked-video/:post_id/:user_uuid", PostsController.likesPost);
router.put("/favory-video/:post_id/:user_uuid", PostsController.favoryPost);

module.exports = router;
