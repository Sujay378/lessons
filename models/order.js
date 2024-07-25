const { Schema, model } = require("mongoose");
const Types = Schema.Types;

const orderSchema = new Schema(
  {
    user: { type: Types.ObjectId, required: true, ref: "User" },
    products: {
      type: [Types.ObjectId],
      required: true,
      validate: {
        validator: (value) => value.length >= 1,
        message: "Atleast one product should be there in an order",
      },
      ref: "product",
    },
    address: { type: Types.String, required: true },
    expectedDelivery: { type: Types.Date, required: true },
    delivered: { type: Types.Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);
module.exports = Order;
