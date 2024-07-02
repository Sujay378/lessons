const fs = require("fs/promises");
const crypto = require("node:crypto");
const path = require("node:path");

const productsPath = path.join(require.main.path, "db", "product.json");

const getAllProducts = async () => {
  const products = await fs.readFile(productsPath, "utf-8");
  return JSON.parse(products);
};

class Product {
  constructor({ id, name, brand, price, rating }) {
    this.id = id || crypto.randomBytes(5).toString("hex");
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.rating = rating;
  }

  static async find() {
    const objArr = await getAllProducts();
    return objArr.map((obj) => new Product(obj));
  }

  static async findById(id) {
    const objArr = await getAllProducts();
    const product = objArr.find((obj) => obj.id === id);
    return product ? new Product(product) : product;
  }

  async update(product, products) {
    product.name = this.name;
    product.brand = this.brand;
    product.price = this.price;
    product.rating = this.rating;
    await fs.writeFile(productsPath, JSON.stringify(products));
    return this;
  }

  async save() {
    const products = await getAllProducts();
    const isExisting = products.find((product) => product.id === this.id);
    if (isExisting) return this.update(isExisting, products);
    products.push({
      id: this.id,
      name: this.name,
      brand: this.brand,
      price: this.price,
      rating: this.rating,
    });
    await fs.writeFile(productsPath, JSON.stringify(products));
    return this;
  }

  toObject() {
    return JSON.parse(JSON.stringify(this));
  }
}

module.exports = Product;
