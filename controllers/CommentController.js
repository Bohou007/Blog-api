const { Video, Comment, UserLikedVideo } = require('../models');
require('dotenv').config();
const helpers = require("../helpers/helpers");
const { v4: uuidv4 } = require('uuid');
const { VideoValidationn } = require("../helpers/validation");

exports.commentVideo = async(req, res, next) => {
    let user = await helpers.getUserByUuid(req.body.user_uuid);
    console.log(user);
    if (user[0] == 200) {
        Comment.create({
                uuid: uuidv4(),
                content: req.body.content,
                user_id: user[1].id,
                video_id: req.body.video_id,
                parent_id: req.body.parent_id ? req.body.parent_id : null,
                is_enable: false,
            })
            .then((comment) => {
                res.status(201).json(comment);
            }).catch((error) => {
                res.status(500).json(error.message);
            });
    } else {
        res.status(user[0]).json(user[1]);
    }
}