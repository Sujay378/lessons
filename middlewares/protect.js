const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  const token = req.get("Authorization");
  if (!token)
    return res.json({
      code: 400,
      message: "Authorization not provided",
    });

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified)
    return res.json({
      code: 401,
      message: "Authorization error",
    });

  const user = await User.findById(verified.id);
  if (!user)
    return res.json({
      code: 400,
      message: "Unknown user credentials",
    });

  if (new Date(verified.iat * 1000) < new Date(user.passwordModifiedAt))
    return res.json({
      code: 400,
      message: "Token expired",
    });

  req.user = user;
  next();
};

module.exports = protect;
