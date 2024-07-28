const router = require("express").Router();

router.route("/").get((req, res) => {
  res.json(req.user.toObject());
});

module.exports = router;
