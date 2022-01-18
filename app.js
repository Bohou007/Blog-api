const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// routes imports
const TestRoutes = require("./routes/TestRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const UserRoutes = require("./routes/UserRoutes");
const PostsRoutes = require("./routes/PostsRoutes");
const CategoriesRoutes = require("./routes/CategoriesRoutes");

// CORS resolution
app.use("*", cors());
app.use(cookieParser());
// parser les requêtes au format JSON
app.use(bodyParser.json());

// Security Configurations
const parseForm = bodyParser.urlencoded({ extended: false });
app.use(parseForm);

// utilisations des routes
app.use("/", TestRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/posts", PostsRoutes);
app.use("/api/categories", CategoriesRoutes);

module.exports = app;