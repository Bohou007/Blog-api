const express = require("express");
const bodyParser = require("body-parser");
const formData = require("express-form-data");
const os = require("os");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

// parse data with connect-multiparty.
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// union the body and the files
app.use(formData.union());
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
const parseForm = bodyParser.urlencoded({ extended: true });
app.use(parseForm);
// for parsing multipart/form-data

// utilisations des routes
app.use("/", TestRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/posts", PostsRoutes);
app.use("/api/categories", CategoriesRoutes);

module.exports = app;
