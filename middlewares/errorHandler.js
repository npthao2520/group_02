// errorHandler.js
module.exports = (err, req, res, next) => {
  console.error("❌ Lỗi toàn cục:", err.stack);

  res.status(err.status || 500).json({
    error: err.message || "Đã xảy ra lỗi máy chủ"
  });
};
