const { Schema, model } = require("mongoose");
const Types = Schema.Types;

const cartSchema = new Schema(
  {
    user: { type: Types.ObjectId, required: true, ref: "User" },
    product: { type: Types.ObjectId, required: true, ref: "product" },
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", cartSchema);
module.exports = Cart;
