const express = require("express");
const router = express.Router();
const flashcardController = require("../controllers/flashcardController");

// 📘 Lấy danh sách flashcard theo id_btv
router.get("/:btvId", flashcardController.getFlashcards);

// ➕ Thêm một flashcard (nếu cần dùng riêng)
router.post("/", flashcardController.addFlashcard);

// ✏️ Cập nhật toàn bộ bộ từ vựng theo id_btv (dùng khi sửa bộ)
router.put("/update/:id", flashcardController.updateFlashcardSet);

module.exports = router;
