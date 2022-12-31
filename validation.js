// Validation

const joi = require("@hapi/joi");

// Register Validation
const registerValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(3).required(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(3).required(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
