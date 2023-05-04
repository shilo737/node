const express = require("express");
const router = express.Router();
const {
  MotorcycleModel,
  validateMotorcycle,
} = require("../model/motorcycleModel");
const { auth } = require("../middlewares/auth");

router.get("/", async (req, res) => {
  const perPage = 5;
  const page = req.query.page - 1 || 0;
  const sort = req.query.sort || "_id"
  const reverse = req.query.reverse == "yes" ? 1 : -1;
  const data = await MotorcycleModel.find({})
    .limit(perPage)
    .skip(page * perPage)
    .sort({[sort]:reverse})
  res.json(data);
});

router.get("/price",async(req,res)=>{
  const min = req.query.min || 0
  const max = req.query.max || Infinity
try{
  const data = await MotorcycleModel
  .find({price:{$gte:min,$lte:max}})
  res.json(data)
}
catch(err){
  console.log(err);
  res.status(502).json({err})
}


});

router.get("/single/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await MotorcycleModel.findOne({ _id: id });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post("/", auth, async (req, res) => {
  const validBody = validateMotorcycle(req.body);
  if (validBody.error) {
    return res.status(401).json(validBody.error.details);
  }
  try {
    const motorcycle = new MotorcycleModel(req.body);
    motorcycle.user_id = req.tokenData._id;
    await motorcycle.save();
    res.json(motorcycle);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.delete("/:id",auth,async (req, res) => {
  try {
    const id = req.params.id;
    const data = await MotorcycleModel.deleteOne({ _id: id, user_id:req.tokenData._id });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.put("/:id", auth,async (req, res) => {
  const validBody = validateMotorcycle(req.body);
  if (validBody.error) {
    return res.status(401).json(validBody.error.details);
  }
  try {
    const id = req.params.id;
    const data = await MotorcycleModel.updateOne({ _id: id,user_id:req.tokenData._id }, req.body);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

module.exports = router;
