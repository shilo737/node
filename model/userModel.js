const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

exports.UserModel = mongoose.model("users", userSchema);

exports.validataUser = (_bodyData) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(2).max(50).email().required(),
    password: Joi.string().min(3).max(200).required(),
  });
  return joiSchema.validate(_bodyData);
};

exports.validataLogin = (_bodyData) => {
  const joiSchema = Joi.object({
    email: Joi.string().min(2).max(50).email().required(),
    password: Joi.string().min(3).max(200).required(),
  });
  return joiSchema.validate(_bodyData);
};
