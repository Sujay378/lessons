const fs = require("fs/promises");

const express = require("express");

const Product = require("./models/product");

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.get("/home", async (_, res) => {
  const html = await fs.readFile("./index.html", "utf-8");
  res.send(html.replace("{{header}}", "Header Test"));
});

app.get("/products", async (_, res) => {
  const products = await Product.find();
  res.json({
    totalRecords: products.length,
    data: products.map((product) => product.toObject()),
  });
});

// passing objects in url which can be parsed automatically by express
// http://localhost:8080/products/CT?sort[field]=fname&sort[order]=asc
// query params would be: sort = { field: 'fname', order: 'asc' }
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  // const { sort } = req.query;
  // console.log(brand, sort);
  const product = await Product.findById(id);
  res.json(product);
});

app.post("/products", async (req, res) => {
  const { name, brand, price, rating } = req.body;
  const product = new Product({ name, brand, price, rating });
  await product.save();
  res.send("New product was created");
});

app.listen(8080, () => console.log("Server listening on port 8080"));
