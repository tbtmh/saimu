const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          req.session.userId = user._id;
          return res.redirect('/home');
        } else {
          // แจ้งว่ารหัสผ่านไม่ถูกต้อง
          req.flash('errorlg', 'Incorrect password'); // เก็บข้อความแจ้งเตือน
          return res.redirect('/login');
        }
      });
    } else {
      // แจ้งว่าไม่พบผู้ใช้
      req.flash('errorlg', 'User not found'); // เก็บข้อความแจ้งเตือน
      return res.redirect('/login');
    }
  });
};
