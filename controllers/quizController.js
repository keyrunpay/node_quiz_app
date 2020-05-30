const mongoose = require("mongoose");
const Quiz = mongoose.model("Quiz");

exports.read = async (req, res) => {
  const allQuiz = await Quiz.find({}, "title slug");
  if (!allQuiz || allQuiz.length === 0) throw "No quiz found";
  res.json({ total: allQuiz.length, data: allQuiz });
};

exports.store = async (req, res) => {
  const { title } = req.body;
  const user = req.payload.id;
  if (!title) throw "Title is required";

  isQuizExists = await Quiz.findOne({ title });
  if (isQuizExists) throw "Quiz with same title already exists";

  const newQuiz = new Quiz({
    title,
    user,
  });

  await newQuiz.save();
  res.json({
    message: "New quiz has been created",
    data: newQuiz,
  });
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const user = req.payload.id;

  const isQuizExists = await Quiz.findById(id);
  if (!isQuizExists) throw "No quiz found";
  if (isQuizExists.user != user)
    throw "You don't own this quiz, so this action is forbidden";

  await isQuizExists.remove();
  res.json({
    message: "Quiz removed successfully",
    data: isQuizExists,
  });
};
