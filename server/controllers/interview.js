const db = require("../config/db");
exports.getAllInterview = async (req, res) => {
    // Tüm soruları al
    const sql2 = "SELECT * FROM interview";
    try {
      db.all(sql2, [], (err, rows) => {
        if (err) {
          console.error(err); // Hatanın detaylarını konsola yazdır
          return res.status(500).json({ success: false, error: "An error occurred while retrieving questions." });
        }
        if (rows.length < 1) {
          return res.status(500).json({ success: false, error: "No matching questions found." });
        }
  
        return res.json({ status: 200, data: rows, success: true });
  
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "An error occurred while retrieving questions." });
    }
  };
  
  exports.createInterview = async (req, res) => {
    try {
      const { username, questionset } = req.body;
      const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD formatında mevcut tarih alınır.
      const sql2 = "INSERT INTO interview(username, date, questionset) VALUES (?, ?, ?)"
      db.run(sql2, [username,date, JSON.stringify(questionset)], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false, error: "Hata" });
        }
        console.log("success", username,date, questionset);
        res.status(200).json({ success: true });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "An error occurred while creating a question." });
    }
  };

  exports.getInterviewById = async (req, res) => {
    try {
      const interviewId = req.params.id; // URL'den gelen interviewId'yi alın
  
      const sql = "SELECT * FROM interview WHERE id = ?";
      db.get(sql, [interviewId], (err, row) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false, error: "An error occurred while retrieving the interview." });
        }
        if (!row) {
          return res.status(404).json({ success: false, error: "Interview not found." });
        }
  
        const { id, username, date, questionset } = row;
        const parsedQuestionset = JSON.parse(questionset);
  
        return res.json({ status: 200, data: { id, username, date, questionset: parsedQuestionset }, success: true });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "An error occurred while retrieving the interview." });
    }
  };
  
  