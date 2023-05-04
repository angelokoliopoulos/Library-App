const express = require("express");
const router = express.Router();
// const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
});

module.exports = router;
