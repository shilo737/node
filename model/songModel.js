const mongoose = require("mongoose")
const Joi =  require("joi")

const songSchema = new mongoose.Schema({
title:String,
year:Number,
singer:String,
youtube_url:String,
genre:String,
user_id:String

},{timestamps:true})

exports.SongModel = mongoose.model("song",songSchema);

exports.validataSong = (_bodyData) =>{
const joiSchema = Joi.object({
title:Joi.string().min(2).max(200).required(),        
year:Joi.number().min(1950).max(2025).required(),        
singer:Joi.string().min(2).max(200).required(),        
youtube_url:Joi.string().min(2).max(999).required(),        
genre:Joi.string().min(2).max(200).required()        
})
return joiSchema.validate(_bodyData)
}