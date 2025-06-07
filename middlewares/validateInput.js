// validateInput.js
module.exports = (requiredFields = []) => {
  return (req, res, next) => {
    const missingFields = [];

    requiredFields.forEach(field => {
      if (!req.body[field] || req.body[field].trim() === '') {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Thiếu trường: ${missingFields.join(", ")}`
      });
    }

    next(); // OK, cho phép tiếp tục
  };
};
