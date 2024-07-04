const path = require("node:path");
require("dotenv").config({ path: path.join(require.main.path, ".env") });
const axios = require("axios").default;
const { Product } = require("./models/product");

require("./db")()
  .then(() => Product.deleteMany())
  .then(() =>
    axios.get("https://dummyjson.com/products?limit=100", {
      headers: { "Content-Type": "application/json" },
    })
  )
  .then((response) => Product.insertMany(response.data.products))
  .then(() => process.exit())
  .catch(console.log);
