const { Post, User, Category, PostCategory } = require("../models");

exports.PostTocategorieAssociation = () => {
    Post.belongsToMany(Category, {
        through: PostCategory,
        foreignKey: "post_id",
        otherKey: "category_id",
    });

    Category.belongsToMany(Post, {
        through: PostCategory,
        foreignKey: "category_id",
        otherKey: "post_id",
    });

    PostCategory.belongsTo(Post, {
        foreignKey: "post_id",
    });

    PostCategory.belongsTo(Category, {
        foreignKey: "category_id",
    });
};