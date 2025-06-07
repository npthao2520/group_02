const express = require("express");
const { promisePool } = require("../config/db");
const router = express.Router();

// 📘 Quiz toàn bộ từ vựng
router.get("/", async (req, res) => {
  try {
    const [rows] = await promisePool.query(`
      SELECT tu_TA, nghia_TV, id_tv
      FROM tu_vung 
      WHERE tu_TA IS NOT NULL AND nghia_TV IS NOT NULL
    `);

    if (!rows || rows.length < 4) {
      return res.status(400).json({ error: "Cần ít nhất 4 từ hợp lệ để tạo quiz" });
    }

    const shuffled = rows.sort(() => Math.random() - 0.5);
    const question = shuffled[0];

    // Đảm bảo question có đủ dữ liệu
    if (!question.tu_TA || !question.nghia_TV) {
      return res.status(500).json({ error: "Dữ liệu câu hỏi không hợp lệ." });
    }

    // Lấy 3 đáp án sai khác với đáp án đúng
    const wrongs = shuffled
      .filter(w => w.nghia_TV !== question.nghia_TV)
      .slice(0, 3)
      .map(w => w.nghia_TV);

    const options = [...wrongs, question.nghia_TV].sort(() => Math.random() - 0.5);

    res.json({
      id_tv: question.id_tv,
      question: question.tu_TA,
      correct: question.nghia_TV,
      options
    });
  } catch (err) {
    console.error("🔥 Lỗi khi tạo quiz:", err);
    res.status(500).json({ error: "Lỗi tạo quiz" });
  }
});

// 📘 Gửi đáp án
router.post("/submit", async (req, res) => {
  const { id_tv, selected } = req.body;
  const user_id = req.session?.user?.id || 1;

  if (!id_tv || !selected) {
    return res.status(400).json({ error: "Thiếu dữ liệu gửi lên" });
  }

  try {
    // Tra đúng nghĩa từ database
    const [rows] = await promisePool.query(
      "SELECT nghia_TV, id_btv FROM tu_vung WHERE id_tv = ?",
      [id_tv]
    );

    if (!rows || rows.length === 0) {
      return res.status(400).json({ error: "Từ vựng không tồn tại" });
    }

    const correct = rows[0].nghia_TV;
    const id_btv = rows[0].id_btv;
    const isCorrect = selected === correct;
    const score = isCorrect ? 100 : 0;

    await promisePool.query(
      "INSERT INTO trac_nghiem (id_btv, user_id, ket_qua) VALUES (?, ?, ?)",
      [id_btv, user_id, score]
    );

    res.json({
      result: isCorrect ? "✅ Chính xác!" : "❌ Sai rồi!",
      score
    });
  } catch (err) {
    console.error("🔥 Lỗi khi xử lý submit:", err);
    res.status(500).json({ error: "Lỗi khi lưu kết quả" });
  }
});

module.exports = router;
