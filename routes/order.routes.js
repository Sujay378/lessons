const router = require("express").Router();

const Order = require("../models/order");

router
  .route("/")
  .get(async (_req, res) => {
    const orders = await Order.find()
      .populate("products", "_id title description price rating thumbnail")
      .populate("user", "-password");
    res.json({
      data: orders,
    });
  })
  .post(async (req, res) => {
    const payload = req.body;
    const newOrder = new Order(payload);
    await newOrder.save();
    res.json({
      data: newOrder,
    });
  });

module.exports = router;
