const { User, Post, Category } = require("../models");
const { CategoryValidationn } = require("../helpers/validation");
const slug = require("slug");
const { v4: uuidv4 } = require("uuid");
const Helpers = require("../helpers/tableRelations");
Helpers.PostTocategorieAssociation();

exports.getAllCategories = (req, res, next) => {
    Category.findAll({ include: [Post] })
        .then((categories) => {
            res.status(200).json(categories);
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
};

exports.getAllCategories = (req, res, next) => {
    Category.findAll({ include: [Post] })
        .then((categories) => {
            res.status(200).json(categories);
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
};

exports.getAllPostsByCategory = (req, res, next) => {
    Category.findAll({ where: { slug: req.params.slug }, include: [Post] })
        .then((categories) => {
            if (categories) {
                res.status(200).json(categories);
            } else {
                res.status(404).json("categories Not Found");
            }
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
};

exports.getOneCategory = (req, res, next) => {
    Category.findOne({ where: { slug: req.params.slug }, include: [Post] })
        .then((category) => {
            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404).json("Category Not Found");
            }
        })
        .catch((err) => {
            res.status(400).json(err.message);
        });
};

exports.createCategory = (req, res, next) => {
    const { error } = CategoryValidationn(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }
    let category = new Category({
        uuid: uuidv4(),
        slug: slug(req.body.title),
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
    });
    category
        .save()
        .then((data_category) => {
            res.status(201).json(category);
        })
        .catch((err) => {
            res.status(500).json(err.message);
        });
};