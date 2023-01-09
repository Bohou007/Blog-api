const Joi = require("@hapi/joi");

exports.registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
    phoneNumber: Joi.string().min(10).max(10).required(),
    confirmation_password: Joi.ref("password"),
  });
  const validation = schema.validate(data);
  return validation;
};

exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required(),
  });
  const validation = schema.validate(data);
  return validation;
};

exports.PostValidationn = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().min(12).required(),
    image: Joi.object().required(),
    user_id: Joi.number().required(),
    category_id: Joi.number().required(),
  });
  const validation = schema.validate(data);
  return validation;
};

exports.CategoryValidationn = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().required(),
    image: Joi.object().required(),
  });
  const validation = schema.validate(data);
  return validation;
};
