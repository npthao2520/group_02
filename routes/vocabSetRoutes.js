const express = require("express");
const router = express.Router();
const { promisePool } = require("../config/db");

// ✅ Lấy tất cả bộ từ vựng
router.get("/", async (req, res) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM bo_tu_vung");
    res.json(rows);
  } catch (error) {
    console.error("Lỗi lấy danh sách bộ từ vựng:", error);
    res.status(500).json({ error: "Không thể lấy danh sách bộ từ vựng" });
  }
});

// ✅ Thêm bộ từ vựng kèm từ
router.post("/", async (req, res) => {
  const { name_btv, words } = req.body;
  const user_id = req.session?.user?.id; // Lấy user_id từ session

  if (!name_btv || !user_id || !Array.isArray(words) || words.length === 0) {
    return res.status(400).json({ error: "Thiếu thông tin bộ từ vựng hoặc danh sách từ" });
  }

  const conn = await promisePool.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      "INSERT INTO bo_tu_vung (name_btv, user_id) VALUES (?, ?)",
      [name_btv, user_id]
    );
    const id_btv = result.insertId;

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
    res.status(201).json({ message: "Tạo bộ từ vựng thành công!" });
  } catch (error) {
    await conn.rollback();
    console.error("Lỗi khi thêm bộ từ vựng:", error);
    res.status(500).json({ error: "Không thể tạo bộ từ vựng" });
  } finally {
    conn.release();
  }
});

// ✅ Xoá bộ từ vựng
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await promisePool.query("DELETE FROM bo_tu_vung WHERE id_btv = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Không tìm thấy bộ từ vựng" });
    }
    res.json({ message: "Đã xoá thành công" });
  } catch (error) {
    console.error("Lỗi xoá:", error);
    res.status(500).json({ error: "Không thể xoá bộ từ vựng" });
  }
});

module.exports = router;
