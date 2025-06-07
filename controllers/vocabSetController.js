const { promisePool } = require("../config/db");

async function getVocabSets(req, res) {
  try {
    const [sets] = await promisePool.query("SELECT * FROM bo_tu_vung WHERE user_id = ?", [req.session.user.id]);
    res.json(sets);
  } catch (err) {
    res.status(500).json({ error: "Không thể lấy danh sách bộ từ vựng" });
  }
}

async function createVocabSet(req, res) {
  const { name_btv } = req.body;
  try {
    await promisePool.query("INSERT INTO bo_tu_vung (name_btv, user_id) VALUES (?, ?)", [name_btv, req.session.user.id]);
    res.status(201).json({ message: "Tạo bộ từ vựng thành công" });
  } catch (err) {
    res.status(500).json({ error: "Không thể tạo bộ từ vựng" });
  }
}

module.exports = { getVocabSets, createVocabSet };
