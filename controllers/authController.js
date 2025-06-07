const bcrypt = require('bcrypt');
const { promisePool } = require('../config/db');

// Hàm đăng ký người dùng
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Thiếu thông tin đăng ký' });
    }
    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        const [rows] = await promisePool.query('SELECT * FROM user WHERE username = ?', [username]);
        if (rows.length > 0) {
            return res.status(400).json({ message: 'Người dùng đã tồn tại' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Lưu người dùng vào cơ sở dữ liệu
        await promisePool.query('INSERT INTO user (username, password) VALUES (?, ?)', [username, hashedPassword]);
        return res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
        console.error('Lỗi đăng ký người dùng:', error);
        return res.status(500).json({ message: 'Lỗi máy chủ' });
    }
}

// Hàm đăng nhập người dùng
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Thiếu thông tin đăng nhập' });
    }
    try {
        // Kiểm tra xem người dùng có tồn tại không
        const [rows] = await promisePool.query('SELECT * FROM user WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Tên người dùng hoặc mật khẩu không đúng' });
        }

        // So sánh mật khẩu
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Tên người dùng hoặc mật khẩu không đúng' });
        }

        // Lưu thông tin người dùng vào session
        req.session.user = {
            id: user.id,
            username: user.username
        };

        // Đăng nhập thành công
        return res.status(200).json({ message: 'Đăng nhập thành công', user: req.session.user });
    } catch (error) {
        console.error('Lỗi đăng nhập người dùng:', error);
        return res.status(500).json({ message: 'Lỗi máy chủ' });
    }
}

module.exports = {
    registerUser,
    loginUser
};