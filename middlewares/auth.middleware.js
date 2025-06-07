const checkAuth = (req, res, next) => {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (req.session && req.session.user) {
    if (req.path === '/auth/login' || req.path === '/auth/register') {
      // Nếu đã đăng nhập, chuyển hướng về trang chủ
      return res.redirect('/');
    }
    return next(); // Nếu đã đăng nhập, cho phép tiếp tục
  }

  if (req.path.startsWith('/auth')) {
    return next(); // Nếu là route auth, cho phép tiếp tục
  }

  return res.redirect('/auth/login'); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
}

module.exports = checkAuth;