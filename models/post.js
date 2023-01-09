"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsToMany(models.Category, {
        through: models.PostCategory,
        foreignKey: "post_id",
        otherKey: "category_id",
      });
      Post.belongsTo(models.User, {
        foreignKey: "user_id",
      });

      Post.hasMany(models.Comment, {
        foreignKey: "post_id",
      });

      Post.belongsToMany(models.User, {
        through: models.UserLikedPost,
        foreignKey: "post_id",
        otherKey: "user_id",
      });

      Post.belongsToMany(models.User, {
        through: models.Favory,
        foreignKey: "post_id",
        otherKey: "user_id",
      });
    }
  }
  Post.init(
    {
      uuid: DataTypes.STRING,
      slug: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      image: DataTypes.STRING,
      view: DataTypes.BIGINT,
      likes: DataTypes.BIGINT,
      is_enable: DataTypes.BOOLEAN,
      is_publish: DataTypes.BOOLEAN,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
