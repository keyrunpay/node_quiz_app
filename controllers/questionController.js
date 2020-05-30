const mongoose = require("mongoose");
const Question = mongoose.model("Question");
const Quiz = mongoose.model("Quiz");
const suffleArray = require("../utils/suffleArray");

exports.readAdmin = async (req, res) => {
  const { quiz } = req.params;
  const allQuestions = await Question.find(
    { quiz },
    "question answer correct_answer"
  );
  if (!allQuestions || allQuestions.length === 0) throw "No questions found";
  res.json({ total: allQuestions.length, data: allQuestions });
};

exports.read = async (req, res) => {
  const { quiz } = req.params;
  const allQuestions = await Question.find({ quiz }, "question answer").lean();
  if (!allQuestions || allQuestions.length === 0) throw "No questions found";

  const suffledQuestion = suffleArray(allQuestions); //suffle question

  //suffle answer of each question
  suffledQuestion.map((item) => ({
    ...item,
    answer: suffleArray(item.answer),
  }));

  res.json({ total: allQuestions.length, data: suffledQuestion });
};

exports.store = async (req, res) => {
  const { question, answer, correct_answer } = req.body;
  const { quiz } = req.params;

  if (!question || !answer || !correct_answer) throw "Insufficient fields";
  if (!Array.isArray(answer)) throw "Answer must be an array";
  if (answer.length < 4) throw "Atleast 4 options should be provided";
  const formatted_correct_answer = answer[parseInt(correct_answer) - 1];

  const isQuiz = await Quiz.findById(quiz);
  if (!isQuiz) throw "Quiz not found";

  const newQuestion = new Question({
    question,
    answer,
    correct_answer: formatted_correct_answer,
    quiz,
  });

  await newQuestion.save();

  res.json({
    message: "New Question added successfully",
    data: newQuestion,
  });
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const isQuestionExists = await Question.findById(id);
  if (!isQuestionExists) throw "No question found";
  await isQuestionExists.remove();
  res.json({
    message: "Question removed successfully",
    data: isQuestionExists,
  });
};
