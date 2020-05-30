const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");

const auth = require("../middlewares/auth");

const userController = require("../controllers/userController");
const quizController = require("../controllers/quizController");
const questionController = require("../controllers/questionController");
const submissionController = require("../controllers/submissionController");

// User Authentication Resources
router.post("/login", catchErrors(userController.login));
router.post("/register", catchErrors(userController.register));

//Quiz route
router.post("/quiz", auth, catchErrors(quizController.store));
router.get("/quiz", auth, catchErrors(quizController.read));
router.delete("/quiz/:id", auth, catchErrors(quizController.delete));

//Question Routes
router.post("/:quiz/question", auth, catchErrors(questionController.store));
router.get(
  "/:quiz/question/admin",
  auth,
  catchErrors(questionController.readAdmin)
);
router.get("/:quiz/question", auth, catchErrors(questionController.read));
router.delete("/question/:id", auth, catchErrors(questionController.delete));

//submission route
router.post("/submit_answer", auth, catchErrors(submissionController.store));
router.get(
  "/submitted_quiz",
  auth,
  catchErrors(submissionController.submittedQuizList)
);

router.get(
  "/submitted_answer/:id",
  auth,
  catchErrors(submissionController.submittedAnswersView)
);

module.exports = router;
