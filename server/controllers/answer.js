const db = require("../config/db");

exports.getAllAnswer = async (req, res) => {
  const sql3 = "SELECT * FROM question";
  try {
    db.all(sql3, [], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: "Veriler getirilirken bir hata oluştu." });
      }
      if (rows.length < 1) {
        return res.status(404).json({ success: false, error: "Eşleşen soru bulunamadı." });
      }

      return res.json({ status: 200, data: rows, success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Veriler getirilirken bir hata oluştu." });
  }
};

exports.createAnswer= async (req, res) => {
  try {
    const { title, degree, answers } = req.body;
    const sql3 = "INSERT INTO question (title, degree, answers) VALUES (?, ?, ?)";
    db.run(sql3, [title, degree, answers], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: "Soru oluşturulurken bir hata oluştu." });
      }
      console.log("success", title, degree, answers);
      res.status(200).json({ success: true, id: this.lastID });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Soru oluşturulurken bir hata oluştu." });
  }
};

exports.getAnswerById = async (req, res) => {
  try {
    const questionId = req.params.id;

    const sql3 = "SELECT * FROM question WHERE id = ?";
    db.get(sql3, [questionId], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: "Soru getirilirken bir hata oluştu." });
      }
      if (!row) {
        return res.status(404).json({ success: false, error: "Soru bulunamadı." });
      }

      const { id, title, degree, answers } = row;

      return res.json({ status: 200, data: { id, title, degree, answers }, success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Soru getirilirken bir hata oluştu." });
  }
};
