const { User } = require("../models");
require("dotenv").config();
const { JWT_ACCESS, JWT_EXPIRES_IN } = process.env;
const fonction = require("../helpers/fonctions");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../helpers/validation");

// const schema =
exports.register = async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  let emailExist = await User.findOne({ where: { email: req.body.email } });
  if (emailExist) return res.status(400).json("Adresse Email existe");

  let pass_lenght = await bcrypt.genSalt(10);
  let password = await bcrypt.hash(req.body.password, pass_lenght);

  const user = new User({
    uuid: uuidv4(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: password,
    phone_number: req.body.phoneNumber,
    role: "USER",
    is_enable: true,
  });

  const token = jwt.sign({ user_id: user.id, email: user.email }, JWT_ACCESS, {
    expiresIn: JWT_EXPIRES_IN,
  });
  // save user token

  user
    .save()
    .then((dataUser) => {
      res.status(201).header("Auth-token", token).json({
        custom: dataUser,
        token: token,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
        message: "Bad Request to created User !",
      });
    });
};

exports.login = async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  console.log(req.body);
  let user = await User.findOne({
    where: { email: req.body.email },
  });
  if (!user) return res.status(400).json("Adress Email or password is wrong");

  let validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).json("password is wrong");
  }

  let data = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(data, JWT_ACCESS, { expiresIn: JWT_EXPIRES_IN });

  res
    .status(200)
    .header("Auth-token", token)
    .json({ customer: user, token: token });
};

exports.getToken = (data) => {
  const token = jwt.sign(data, JWT_ACCESS, { expiresIn: JWT_EXPIRES_IN });

  return token;
};
