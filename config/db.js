const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load biến môi trường từ file `.env` 
dotenv.config();

// Tạo pool, pool hỗ trợ nhiều truy vấn 
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, // tránh lỗi khi pool đang đầy kết nối 
    connectionLimit: 10, // số lượng kết nối tối đa có thể mở từ pool 
    queueLimit: 0 // số lượng truy vấn được xếp hàng nếu hết kết nối 
})

// Sử dụng promise để hỗ trợ async/await 
const promisePool = pool.promise(); 

// Kiểm tra kết nối 
async function checkConnection() {
    try {
        const connection = await promisePool.getConnection();
        console.log('Kết nối MySQL thành công');
        connection.release()
    } catch(err) {
        console.error('Lỗi kết nối MySQL:',err);
        process.exit(1)
    }
}

// Xuất promisePool và checkConnection
module.exports = {promisePool, checkConnection}