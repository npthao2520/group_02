const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const checkAuth = require('../middlewares/auth.middleware');
const path = require('path');

const router = express.Router();

// Định nghĩa route cho đăng ký
router.post('/register', registerUser);
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/layouts/register.html')); // Render trang đăng ký
});

// Định nghĩa route cho đăng nhập
router.post('/login', loginUser);
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/layouts/login.html')); // Render trang đăng nhập
});

// Route kiểm tra phiên đăng nhập
router.get("/check-session", (req, res) => {
    if (req.session && req.session.user) {
        return res.json({ loggedIn: true, user: req.session.user });
    }
    res.json({ loggedIn: false });
});

// Định nghĩa route cho đăng xuất
router.get('/logout', (req, res) => {
    // Xóa thông tin người dùng khỏi session
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi khi đăng xuất' });
        }
        res.clearCookie('session_cookie'); // Xóa cookie session
        res.redirect('/'); // Chuyển hướng về trang chủ        
    });
});


module.exports = router;