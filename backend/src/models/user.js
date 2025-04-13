const mongoose = require("mongoose");
const validator = require("validator");
// const {jwt} = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// console.log(validator);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isAlphanumeric(value)) {
          throw new Error("not a valid name");
        }
      },

      minLength: 3,
      maxLength: 50,
      // unique:true
    },

    lastName: {
      type: String,
    },

    photoId: {
      type: String,
      default:
        "https://res.cloudinary.com/ddu6tybft/image/upload/v1742545381/user_pic_n43way.jpg",
    },

    emailId: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,

      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email formate");
          // res.status(400).send("this is not correct email formate");
        }
      },

      minlength: 10,
      maxLength: 50,
    },

    password: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 2000,
    },

    age: {
      type: String,
      validate(value) {
        if (!validator.isNumeric(value)) {
          throw new Error("age is not a valid number");
        }
      },

      min: 18,
      max: 100,
    },

    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("not valid form of gender");
        }
      },
    },

    bio: {
      type: String,
      default:
        "hi I am on on CollabOne , I want to connect with other developers",
    },

    skills: {
      type: [String],
    },
  },

  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "CollabOne@790", {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordByUser) {
  // console.log("hello",passwordByUser,this.password);

  const isValidPassword = await bcrypt.compare(passwordByUser, this.password);
  return isValidPassword;
};

module.exports = mongoose.model("User", userSchema);
