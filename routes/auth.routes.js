const router = require("express").Router();

const User = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const { email } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate)
      return res.status(500).json({
        code: 500,
        key: "existingUser",
        message: "User already exists",
      });

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json({
      message: "User created successfully.",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (!candidate)
      return res.status(400).json({
        code: 400,
        key: "userNotFound",
        message: "Given email or password is wrong",
      });

    const isValidPassword = await candidate.validatePassword(password);
    if (!isValidPassword)
      return res.status(400).json({
        code: 401,
        key: "unAuthorized",
        message: "Given email or password is wrong",
      });

    res.json({
      id: candidate.id,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
