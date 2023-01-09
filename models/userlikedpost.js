"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserLikedPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserLikedPost.belongsTo(models.Post, {
        foreignKey: "post_id",
      });
      UserLikedPost.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  UserLikedPost.init(
    {
      post_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserLikedPost",
    }
  );
  return UserLikedPost;
};
