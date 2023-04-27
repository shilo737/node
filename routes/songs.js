const express = require("express");
const router = express.Router();
const { SongModel, validataSong } = require("../model/songModel");
const { auth } = require("../middlewares/auth");

router.get("/", async (req, res) => {
  const perPage = 3;
  const page = req.query.page - 1 || 0;
  const data = await SongModel.find({})
    .limit(perPage)
    .skip(page * perPage);
  res.json(data);
});
router.post("/",auth ,async (req, res) => {
  const validBody = validataSong(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const song = new SongModel(req.body);
    song.user_id = req.tokenData._id
    await song.save();
    res.json(song);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.put("/:id", async (req, res) => {
  const validBody = validataSong(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const id = req.params.id;
    const data = await SongModel.updateOne({ _id: id }, req.body);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await SongModel.deleteOne({ _id: id });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

module.exports = router;
