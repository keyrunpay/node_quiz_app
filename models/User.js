const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required.",
    },
    email: {
      type: String,
      required: "Email is required.",
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("User", userSchema);
