
const db = require("../config/db");

exports.getAllQuestions = async (req, res) => {
  // Tüm soruları al
  const sql = "SELECT * FROM questions";
  try {
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err); // Hatanın detaylarını konsola yazdır
        return res.status(500).json({ success: false, error: "An error occurred while creating a question." });
      }
      if (rows.length < 1) {
        return res.status(500).json({ success: false, error: "no match" });
      }

      return res.json({ status: 200, data: rows, success: true });

    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "An error occurred while creating a question." });
  }
};
exports.getQuestionsById = async (req, res) => {
  try {
    const questionsId = req.params.id; // URL'den gelen interviewId'yi alın

    const sql = "SELECT * FROM questions WHERE id = ?";
    db.get(sql, [questionsId], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: "An error occurred while retrieving the interview." });
      }
      if (!row) {
        return res.status(404).json({ success: false, error: "Interview not found." });
      }

      const { id, name, questions } = row;
      const parsedQuestions = JSON.parse(questions);

      return res.json({ status: 200, data: { id, name, questions: parsedQuestions }, success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "An error occurred while retrieving the interview." });
  }
};
exports.createQuestion = async (req, res) => {
  try {
    const { name, questions } = req.body;
    const sql = "INSERT INTO questions (name, questions) VALUES (?, ?)";
    db.run(sql, [name, JSON.stringify(questions)], (err) => {
      if (err) {
        
        console.error(err);
        return res.status(500).json({ success: false, error: "An error occurred while creating a question." });
      }
      console.log("success", name, questions);
      res.status(200).json({ success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "An error occurred while creating a question." });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = "DELETE FROM questions WHERE id = ?";
    db.run(sql, [id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: "An error occurred while deleting the question." });
      }
      console.log("success", id);
      res.status(200).json({ success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "An error occurred while deleting the question." });
  }
};
exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, questions } = req.body;

    const sql = "UPDATE questions SET name = ?, questions = ? WHERE id = ?";
    db.run(sql, [name, JSON.stringify(questions), id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: "An error occurred while updating the question." });
      }
      console.log("success", id);
      res.status(200).json({ success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "An error occurred while updating the question." });
  }
};
