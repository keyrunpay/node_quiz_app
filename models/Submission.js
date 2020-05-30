const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
    correct_count: {
      type: Number,
      default: 0,
    },
    submission: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
        answer: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Submission", submissionSchema);
