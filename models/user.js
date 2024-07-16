const validatorjs = require("validator");
const { Schema, model } = require("mongoose");
const Types = Schema.Types;

const userSchema = new Schema(
  {
    firstName: {
      type: Types.String,
      required: [true, "User should always have a first Name"],
    },
    lastName: Types.String,
    email: {
      type: Types.String,
      required: [true, "User email id is missing"],
      unique: [true, "Email is already present"],
      validate: {
        validator: function (value) {
          return validatorjs.isEmail(value);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    imagePath: Types.String,
    password: {
      type: Types.String,
      required: [true, "Password is missing"],
      validate: {
        validator: function (value) {
          return new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
          ).test(value);
        },
        message: "Please provide a valid password",
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
