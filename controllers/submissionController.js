const mongoose = require("mongoose");
const Quiz = mongoose.model("Quiz");
const Question = mongoose.model("Question");
const Submission = mongoose.model("Submission");

exports.store = async (req, res) => {
  const user = req.payload.id;
  const { question, answer, quiz } = req.body;

  if (!question || !answer) throw "Question & Answer is required";
  const isQuiz = await Quiz.findById(quiz);
  if (!isQuiz) throw "No quiz found";

  const isQuestion = await Question.findById(question);
  if (!isQuestion) throw "No question found";

  const isCorrect = isQuestion.correct_answer == answer;
  let isSubmissionExist = await Submission.findOne({ user, quiz });

  if (!isSubmissionExist) {
    const isSubmissionExist = new Submission({
      user,
      quiz,
      correct_count: isCorrect ? 1 : 0,
      submission: [{ question, answer }],
    });
    await isSubmissionExist.save();

    res.json({
      message: "Answer submitted successfully",
      correct_answer: isSubmissionExist.correct_count,
    });
    return;
  }

  const submitted_question = isSubmissionExist.submission;
  const isAlreadySubmitted =
    submitted_question.filter((item) => item.question == question).length > 0;
  if (isAlreadySubmitted)
    throw "Question has already been submitted, can't submit twice";

  isSubmissionExist.correct_count = isCorrect
    ? isSubmissionExist.correct_count + 1
    : isSubmissionExist.correct_count;
  isSubmissionExist.submission.push({ question, answer });

  await isSubmissionExist.save();
  res.json({
    message: "Answer submitted successfully",
    correct_answer: isSubmissionExist.correct_count,
  });
};

exports.submittedQuizList = async (req, res) => {
  const user = req.payload.id;
  const getSubmissions = await Submission.find(
    { user },
    "quiz correct_count"
  ).populate("quiz", "title");

  if (!getSubmissions || getSubmissions.length === 0)
    throw "No any quiz played yet";

  res.json({ total_quiz_played: getSubmissions.length, data: getSubmissions });
};

exports.submittedAnswersView = async (req, res) => {
  const { id } = req.params;
  const getSubmissions = await Submission.findById(
    id,
    "submission correct_count"
  ).populate("submission.question", "question correct_answer");

  if (!getSubmissions) throw "No submission found";

  res.json(getSubmissions);
};
