const { User, Post, Category } = require("../models");
const slug = require("slug");
const { sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Helpers = require("../helpers/fonctions");
const { PostValidationn } = require("../helpers/validation");

exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
};

exports.getAllRrecentPosts = (req, res, next) => {
    Post.findAll({
            limit: 6,
            order: [
                ["createdAt", "DESC"]
            ],
        })
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
};

exports.getAllFavorisPosts = (req, res, next) => {
    Post.findAll({
            limit: 2,
            order: [
                ["view", "DESC"]
            ],
        })
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
};

exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: { slug: req.params.slug } })
        .then((post) => {
            if (post) {
                Helpers.addView(post.id);
                res.status(200).json(post);
            } else {
                res.status(404).json("Post Not Found");
            }
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
};

exports.createPost = (req, res, next) => {
    const { error } = PostValidationn(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    let post = new Post({
        uuid: uuidv4(),
        slug: slug(req.body.title),
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        view: 0,
        user_id: req.body.user_id,
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