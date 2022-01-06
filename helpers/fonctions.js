const { User, Post, PostCategory } = require('../models');
require('dotenv').config();
const { JWT_ACCESS, JWT_EXPIRES_IN } = process.env;
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loginValidation } = require('../helpers/validation');

exports.getPost = async(post_id) => {
    let post = await Post.findOne({ where: { id: post_id } })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            return [];
        });
    return post;
}

exports.login = async(email, password) => {
    let user = await User.findOne({
        where: { email: email }
    });
    if (!user) return res.status(400).json('Adress Email or password is wrong');

    let validPass = await bcrypt.compare(password, user.password);
    if (!validPass) { return res.status(400).json('password is wrong') };

    let data = {
        id: user.id,
        email: user.email
    }

    const token = jwt.sign(data,
        JWT_ACCESS, { expiresIn: JWT_EXPIRES_IN });

    console.log(token);
    return json(token);

}

exports.attachPostToCategory = (post_id, category_id) => {
    for (let index = 0; index < category_id.length; index++) {
        const element = category_id[index];
        PostCategory.create({
                post_id: post_id,
                category_id: element
            })
            .then(() => {
                return 'Attach succesful !';
            })
            .catch((err) => {
                return err.message;
            });
    }
}


exports.addView = async(post_id) => {
    let post = await this.getPost(post_id);
    let view = post.view + 1;
    Post.update({
            view: view
        }, { where: { id: post_id } })
        .then(() => {
            return "Updated succeful !";
        }).catch((err) => {
            return err.message;
        });
}