const router = require("express").Router();

const Product = require("../models/product");

router
  .route("/")
  .get(async (_, res) => {
    const products = await Product.find();
    res.json({
      totalRecords: products.length,
      data: products.map((product) => product.toObject()),
    });
  })
  .post(async (req, res) => {
    const { name, brand, price, rating } = req.body;
    const product = new Product({ name, brand, price, rating });
    await product.save();
    res.send("New product was created");
  });

// passing objects in url which can be parsed automatically by express
// http://localhost:8080/products/CT?sort[field]=fname&sort[order]=asc
// query params would be: sort = { field: 'fname', order: 'asc' }
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  // const { sort } = req.query;
  // console.log(brand, sort);
  const product = await Product.findById(id);
  res.json(product);
});

router;

module.exports = router;
