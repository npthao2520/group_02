const { promisePool } = require("../config/db");

// 📘 Lấy danh sách flashcard theo id_btv
async function getFlashcards(req, res) {
  const { btvId } = req.params;
  try {
    const [cards] = await promisePool.query(
      "SELECT tu_TA, nghia_TV FROM tu_vung WHERE id_btv = ?",
      [btvId]
    );
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: "Không thể lấy flashcard" });
  }
}

// ➕ Thêm flashcard mới (không dùng trong sửa bộ từ vựng)
async function addFlashcard(req, res) {
  const { tu_TA, nghia_TV, id_btv } = req.body;
  try {
    await promisePool.query(
      "INSERT INTO tu_vung (tu_TA, nghia_TV, id_btv) VALUES (?, ?, ?)",
      [tu_TA, nghia_TV, id_btv]
    );
    res.status(201).json({ message: "Thêm flashcard thành công" });
  } catch (err) {
    res.status(500).json({ error: "Không thể thêm flashcard" });
  }
}

// ✏️ Cập nhật toàn bộ bộ từ vựng (name + từ mới)
async function updateFlashcardSet(req, res) {
  const id_btv = req.params.id;
  const { name_btv, words } = req.body;
console.log("🔥 Nhận dữ liệu update:", req.body);

  const conn = await promisePool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query("UPDATE bo_tu_vung SET name_btv = ? WHERE id_btv = ?", [name_btv, id_btv]);
    await conn.query("DELETE FROM tu_vung WHERE id_btv = ?", [id_btv]);

    for (const word of words) {
      const { tu_TA, nghia_TV } = word;
      if (tu_TA && nghia_TV) {
        await conn.query(
          "INSERT INTO tu_vung (tu_TA, nghia_TV, id_btv) VALUES (?, ?, ?)",
          [tu_TA, nghia_TV, id_btv]
        );
      }
    }

    await conn.commit();
    res.json({ message: "Cập nhật bộ từ vựng thành công!" });
  } catch (err) {
    await conn.rollback();
    console.error("Lỗi cập nhật:", err);
    res.status(500).json({ error: "Không thể cập nhật bộ từ vựng" });
  } finally {
    conn.release();
  }
}
module.exports = {
  getFlashcards,
  addFlashcard,
  updateFlashcardSet
};
