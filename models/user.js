const validatorjs = require("validator");
const bcrypt = require("bcrypt");
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

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.method("validatePassword", async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
});

const User = model("User", userSchema);
module.exports = User;
