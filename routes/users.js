const express = require("express");
const bcrypt = require("bcrypt")
const router = express.Router();
const { UserModel, validataUser, validataLogin } = require("../model/userModel");


router.get("/", async (req, res) => {
  const data = await UserModel.find({});
  res.json(data);
});

router.post("/", async (req, res) => {
  const validBody = validataUser(req.body);
  if (validBody.error) {
    return res.status(401).json(validBody.error.details);
  }

  try {
    const user = new UserModel(req.body)
    user.password = await bcrypt.hash(user.password,10)
    await user.save()
    user.password = "*****"
    res.json(user)
  } catch (err) {
    if(err.code == 11000){
        return res.status(401).json({err:"Email already in system",code:11000})
    }
    console.log(err);
    res.status(502).json({err});
  }
});

router.post("/login",async(req,res) => {
    const validBody = validataLogin(req.body);
    if (validBody.error) {
      return res.status(401).json(validBody.error.details);
    }
    try{

        
        
    }
    catch(err){
        console.log(err);
        res.status(502).json({err})
    }

})

module.exports = router;
