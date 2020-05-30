const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    answer: [],
    correct_answer: {
      type: String,
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Question", questionSchema);
