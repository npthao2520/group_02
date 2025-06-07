const express = require("express");
const dotenv = require("dotenv");
const { checkConnection } = require("./config/db");
const path = require("path"); // Thư viện để làm việc với đường dẫn file hệ thống
const session = require("express-session"); // Thư viện để quản lý session
const MYSQLStore = require("express-mysql-session")(session); // Thư viện để lưu trữ session trong MySQL
const { promisePool } = require("./config/db"); // Import promisePool từ file db.js để sử dụng trong session store
const checkAuth = require("./middlewares/auth.middleware"); // Import middleware kiểm tra xác thực

// Load biến môi trường từ file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000; // Load biến port từ file env, nếu biến PORT ko tồn tại hoặc rỗng thì để port là 3000

// Middleware để parse JSON request body và URL-encoded request body
app.use(express.json()); // Middleware để parse JSON request body
app.use(express.urlencoded({ extended: true })); // Middleware để parse URL-encoded request body
app.use(express.static(path.join(__dirname, "./view/layouts"))); // Middleware để phục vụ file tĩnh từ thư mục view/layouts
app.use(express.static(path.join(__dirname, "public"))); // Middleware để phục vụ file tĩnh từ thư mục public

// Thiết lập session store với MySQL
const sessionStore = new MYSQLStore({}, promisePool);

// Cấu hình session
app.use(
  session({
    key: "session_cookie",
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Thời gian sống của cookie (1 ngày)
      secure: false, // Thiết lập true nếu sử dụng HTTPS
      httpOnly: true, // Chỉ cho phép truy cập cookie từ server
    },
  })
);

// Import các route
const pageRoute = require("./routes/pages.route");
const authRoute = require("./routes/authRoutes");
const profileRoutes = require("./routes/user.route");

// Sử dụng các route
app.use(checkAuth); // Middleware kiểm tra xác thực trước khi xử lý các route khác
app.use("/", checkAuth, pageRoute); // Route cho các trang
app.use("/auth", authRoute); // Route cho các chức năng liên quan đến xác thực
app.use("/vocab-sets", require("./routes/vocabSetRoutes"));
app.use("/flashcards", require("./routes/flashcardRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/profile", profileRoutes); // Route cho trang cá nhân


// Kiểm tra kết nối database trước khi khởi động server
checkConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server đang chạy trên http://localhost:${PORT}`); // Đổi dấu ' thành ` để truyền biến
    });
  })
  .catch(err => {
    console.error("Không thể khởi động server do lỗi database:", err);
  });
