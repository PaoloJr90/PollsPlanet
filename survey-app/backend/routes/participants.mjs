import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET all answers for a specified question route for participant
//:id means a question id
router.get("/answers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const answersSpecifiedQ = await pool.query(
      "SELECT * FROM ANSWERS where question_id = $1",
      [id]
    );
    res.json(answersSpecifiedQ.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// GET all questions route for participant
router.get("/ans", async (req, res) => {
  try {
    const allQuestions = await pool.query("SELECT * FROM questions");
    res.json(allQuestions.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get survey and related questions by token route for participant
router.get("/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const queryText = `SELECT 
    surveys.id AS survey_id,
    surveys.title AS survey_title,
    surveys.uuid AS survey_uuid,
    questions.survey_id AS question_survey_id,
    questions.question
    FROM surveys
    INNER JOIN questions ON surveys.id = questions.survey_id
    WHERE surveys.uuid = $1;`;

    const getSurveyWithQuestions = await pool.query(queryText, [token]);

    res.json(getSurveyWithQuestions.rows);
    console.log(getSurveyWithQuestions.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST all question responses route for participant
router.post("/", async (req, res) => {
  try {
    const answers = [...req.body];
    const insertedAnswers = [];

    for (const answerItem of answers) {
      const { survey_id, question_id, answer } = answerItem;

      const insertText =
        "INSERT INTO answers (survey_id, question_id, answer) VALUES($1, $2, $3) RETURNING *;";

      const { rows } = await pool.query(insertText, [
        survey_id,
        question_id,
        answer,
      ]);

      insertedAnswers.push(rows[0]);
    }

    res.status(201).json(insertedAnswers);
  } catch (err) {
    console.error(err.message);
  }
});

export const participantRouter = router;
