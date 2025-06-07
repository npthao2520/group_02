const fs = require("fs").promises;
const path = require("path");

// Đường dẫn tới thư mục chứa các file HTML
const VIEW_DIR = path.join(__dirname, "../view/layouts");

// Hàm render trang
async function renderPage(page, res) {
  try {
    if (page === "login" || page === "register") {
      // Nếu là trang login hoặc register, chỉ gửi trực tiếp
      const rawPage = await fs.readFile(path.join(VIEW_DIR, `${page}.html`), "utf8");
      return res.send(rawPage);
    }

    // Ghép header + nội dung + footer
    const header = await fs.readFile(path.join(VIEW_DIR, "header.html"), "utf8");
    const content = await fs.readFile(path.join(VIEW_DIR, `${page}.html`), "utf8");
    const footer = await fs.readFile(path.join(VIEW_DIR, "footer.html"), "utf8");

    const fullPage = `${header}\n${content}\n${footer}`;
    res.send(fullPage);
  } catch (err) {
    console.error(`❌ Lỗi khi render trang "${page}":`, err.message);
    res.status(500).send("Lỗi tải trang.");
  }
}

module.exports = { renderPage };
