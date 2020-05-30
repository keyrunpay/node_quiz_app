const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Quiz", quizSchema);
