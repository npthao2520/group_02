const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/userController");

// Route: GET /api/profile
router.get("/", getProfile);

module.exports = router;
