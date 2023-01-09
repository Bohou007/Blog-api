const { User, Post, Category } = require("../models");
const slug = require("slug");
const { sequelize, where } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Helpers = require("../helpers/fonctions");
const relation = require("../helpers/tableRelations");
const { PostValidationn } = require("../helpers/validation");
const service = require("../services/uploadImages");

relation.PostTocategorieAssociation();

exports.getAllPosts = (req, res, next) => {
  Post.findAll({ include: [Category, User], order: [["createdAt", "DESC"]] })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

exports.getAllRrecentPosts = (req, res, next) => {
  Post.findAll({
    limit: 3,
    order: [["createdAt", "DESC"]],
    include: [Category, User],
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

exports.getPopularPosts = (req, res, next) => {
  Post.findAll({
    limit: 3,
    order: [["view", "DESC"]],
    include: [Category, User],
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

exports.getAllFavorisPosts = async (req, res, next) => {
  let favorise = await Helpers.getFavoritePostForUser(req.params.user_id);
  let data = [];
  for (let i = 0; i < favorise[1].length; i++) {
    let element = favorise[1][i];
    let response = await Helpers.getPost(element.post_id);
    data.push(response[1]);
  }
  res.status(200).json(data);
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({
    where: { slug: req.params.slug },
    include: [Category, User],
  })
    .then(async (post) => {
      if (post) {
        console.log(post);
        await Helpers.addView(post.id);
        let newPost = await Helpers.getPost(post.id);
        res.status(200).json(post);
      } else {
        res.status(404).json("Post Not Found");
      }
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

exports.createPost = async (req, res, next) => {
  const { error } = PostValidationn(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  let file = await req.files.image;
  let image = await service.uploadImage(file.path);
  if (image[0] == 500) {
    return res.status(400).json(image[1]);
  }
  let post = new Post({
    uuid: uuidv4(),
    slug: slug(req.body.title),
    title: req.body.title,
    content: req.body.content,
    image: image[1].url,
    user_id: req.body.user_id,
    view: 0,
    likes: 0,
    is_enable: true,
    is_publish: true,
  });

  post
    .save()
    .then((data_post) => {
      Helpers.attachPostToCategory(data_post.id, req.body.category_id);
      res.status(201).json(data_post);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

exports.updatePost = async (req, res, next) => {
  let post = await Helpers.getPostBySlug(req.params.slug);
  Post.update(
    {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
    },
    { where: { slug: req.params.slug } }
  )
    .then((data_post) => {
      if (req.body.category_id) {
        Helpers.attachPostToCategory(post.id, req.body.category_id);
      }
      res.status(200).json("Update successfully !");
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

exports.likesPost = async (req, res, next) => {
  let user = await Helpers.getUserByUuid(req.params.user_uuid);
  let post = await Helpers.getPostByID(req.params.post_id);
  let response = await Helpers.verifyLike(post[1].id, user[1].id);
  console.log(response);
  if (response[2]) {
    let remove_res = await Helpers.removeLikes(post[1].id, user[1].id);
    res.status(remove_res[0]).json(remove_res[1]);
  } else {
    let add_res = await Helpers.addLikes(post[1].id, user[1].id);
    res.status(add_res[0]).json(add_res[1]);
  }
};

exports.favoryPost = async (req, res, next) => {
  let user = await Helpers.getUserByUuid(req.params.user_uuid);
  let video = await Helpers.getPostByID(req.params.video_id);
  let response = await Helpers.verifyFavory(video[1].id, user[1].id);
  console.log(response);
  if (response[2]) {
    let remove_res = await Helpers.removeFavory(video[1].id, user[1].id);
    res.status(remove_res[0]).json(remove_res[1]);
  } else {
    let add_res = await Helpers.addFavory(video[1].id, user[1].id);
    res.status(add_res[0]).json(add_res[1]);
  }
};
