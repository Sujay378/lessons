const fs = require("node:fs/promises");
const path = require("node:path");

require("dotenv").config({ path: path.join(require.main.path, ".env") });
const express = require("express");

const productRoutes = require("./routes/product.routes");

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.get("/home", async (_, res) => {
  const html = await fs.readFile("./index.html", "utf-8");
  res.send(html.replace("{{header}}", "Header Test"));
});

app.use("/products", productRoutes);

console.log(process.env.APP_ENV);

require("./db")()
  .then(() =>
    app.listen(8080, () => console.log("Server listening on port 8080"))
  )
  .catch(console.log);
