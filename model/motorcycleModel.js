const mongoose = require("mongoose");
const Joi = require("joi");

const motorcycleSchema = new mongoose.Schema({
  company: String,
  model: String,
  year: Number,
  price: Number,
  user_id:String
},{timestamps:true});

exports.MotorcycleModel = mongoose.model("motorcycle", motorcycleSchema);

exports.validateMotorcycle = (_bodyData) => {
  const joiSchema = Joi.object({
    company: Joi.string().min(2).max(100).required(),
    model: Joi.string().min(2).max(100).required(),
    year: Joi.number().min(1970).max(2050).required(),
    price: Joi.number().min(1).max(1000000).required(),
  });
  return joiSchema.validate(_bodyData);
};
