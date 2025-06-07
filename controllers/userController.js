const { promisePool } = require("../config/db");

async function getProfile(req, res) {
  try {
    const userId = req.session?.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Chưa đăng nhập" });
    }

    const [userRows] = await promisePool.query(
      "SELECT id, username FROM user WHERE id = ?",
      [userId]
    );
    if (userRows.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy người dùng" });
    }

    const [btvRows] = await promisePool.query(
      "SELECT name_btv FROM bo_tu_vung WHERE user_id = ?",
      [userId]
    );
    const vocab_sets = btvRows.map(row => row.name_btv);

    const [scoreRows] = await promisePool.query(
      "SELECT AVG(ket_qua) AS average_score FROM trac_nghiem WHERE user_id = ?",
      [userId]
    );
    const average_score = Math.round(scoreRows[0].average_score || 0);

    res.json({
      username: userRows[0].username,
      vocab_sets,
      average_score
    });

  } catch (err) {
    console.error("❌ Lỗi trong getProfile:", err); // ⚠️ Ghi log chi tiết
    res.status(500).json({ error: "Không thể lấy thông tin người dùng" });
  }
}

module.exports = { getProfile };
