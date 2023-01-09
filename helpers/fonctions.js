const {
  User,
  Post,
  PostCategory,
  UserLikedPost,
  Category,
  Favory,
} = require("../models");

require("dotenv").config();
const { JWT_ACCESS, JWT_EXPIRES_IN } = process.env;
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("../helpers/validation");

exports.getPost = async (post_id) => {
  let post = await Post.findOne({
    where: { id: post_id },
    include: [Category, User],
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return [];
    });
  return post;
};

exports.getPostBySlug = async (post_slug) => {
  let post = await Post.findOne({
    where: { slug: post_slug },
    include: [Category, User],
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return [];
    });
  return post;
};

exports.login = async (email, password) => {
  let user = await User.findOne({
    where: { email: email },
  });
  if (!user) return res.status(400).json("Adress Email or password is wrong");

  let validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.status(400).json("password is wrong");
  }

  let data = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(data, JWT_ACCESS, { expiresIn: JWT_EXPIRES_IN });

  console.log(token);
  return json(token);
};

exports.attachPostToCategory = (post_id, category_id) => {
  for (let index = 0; index < category_id.length; index++) {
    const element = category_id[index];
    PostCategory.create({
      post_id: post_id,
      category_id: element,
    })
      .then(() => {
        return "Attach succesful !";
      })
      .catch((err) => {
        return err.message;
      });
  }
};

exports.addView = async (post_id) => {
  let post = await this.getPost(post_id);
  let view = parseInt(post.view) + 1;
  Post.update(
    {
      view: view,
    },
    { where: { id: post_id } }
  )
    .then(() => {
      return "Updated succeful !";
    })
    .catch((err) => {
      return err.message;
    });
};

exports.getUserByUuid = async (user_uuid) => {
  let user = await User.findOne({ where: { uuid: user_uuid } })
    .then((data) => {
      if (data) {
        return [200, data];
      } else {
        return [404, "User not found !"];
      }
    })
    .catch((err) => {
      return [500, err.message];
    });
  return user;
};

exports.getPostByID = async (post_id) => {
  let post = await Post.findOne({ where: { id: post_id } })
    .then((data) => {
      return [200, data];
    })
    .catch((err) => {
      return [500, err.message];
    });
  return post;
};

exports.actionLikePlus = async (post_id) => {
  let post = await this.getPostByID(post_id);
  let like = parseInt(post[1].likes) + 1;
  console.log(like);
  Post.update({ likes: like }, { where: { id: post_id } })
    .then((data) => {
      return "Post Update";
    })
    .catch((err) => {
      return err.message;
    });
};

exports.actionLikeMoin = async (post_id) => {
  let post = await this.getPostByID(post_id);
  let like =
    parseInt(post[1].likes) == 0
      ? 1 - parseInt(post[1].likes)
      : parseInt(post[1].likes) - 1;
  console.log(like);
  Post.update({ likes: like }, { where: { id: post_id } })
    .then((data) => {
      return "Post Update";
    })
    .catch((err) => {
      return err.message;
    });
};

exports.addLikes = async (post_id, user_id) => {
  let data = await UserLikedPost.create({
    post_id: post_id,
    user_id: user_id,
  })
    .then(async (userLikedPost) => {
      let dat = await this.actionLikePlus(post_id);
      return [201, "Like was successfully added"];
    })
    .catch((error) => {
      return [500, error.message];
    });
  return data;
};

exports.removeLikes = async (post_id, user_id) => {
  let data = await UserLikedPost.destroy({
    where: {
      post_id: post_id,
      user_id: user_id,
    },
  })
    .then(async (userLikedPost) => {
      let dat = await this.actionLikeMoin(post_id);
      return [200, "Like was successfully removed"];
    })
    .catch((error) => {
      return [500, error.message];
    });
  return data;
};

exports.addFavory = async (post_id, user_id) => {
  let data = await Favory.create({
    post_id: post_id,
    user_id: user_id,
  })
    .then((favory) => {
      return [201, "Favory was successfully added"];
    })
    .catch((error) => {
      return [500, error.message];
    });
  return data;
};

exports.removeFavory = async (post_id, user_id) => {
  let data = await Favory.destroy({
    where: {
      post_id: post_id,
      user_id: user_id,
    },
  })
    .then((favory) => {
      return [200, "Favory was successfully removed"];
    })
    .catch((error) => {
      return [500, error.message];
    });
  return data;
};

exports.verifyLike = async (post_id, user_id) => {
  let data = await UserLikedPost.findOne({
    where: { post_id: post_id, user_id: user_id },
  })
    .then((data) => {
      if (data) {
        return [200, data, true];
      } else {
        return [404, "Not found", false];
      }
    })
    .catch((err) => {
      return [500, err.message, false];
    });
  return data;
};

exports.verifyFavory = async (post_id, user_id) => {
  let data = await Favory.findOne({
    where: { post_id: post_id, user_id: user_id },
  })
    .then((data) => {
      if (data) {
        return [200, data, true];
      } else {
        return [404, "Not found", false];
      }
    })
    .catch((err) => {
      return [500, err.message, false];
    });
  return data;
};

exports.getFavoritePostForUser = async (user_id) => {
  let data = await Favory.findAll({
    where: { user_id: user_id },
  })
    .then((data) => {
      return [200, data];
    })
    .catch((err) => {
      return [500, err.message];
    });
  return data;
};
