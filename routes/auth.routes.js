const router = require("express").Router();

const User = require("../models/user");

router.post("/register", async (req, res) => {
  let newUser = new User(req.body);
  newUser = await newUser.save();
  res.status(201).json({
    message: "User created successfully.",
  });
});

module.exports = router;
