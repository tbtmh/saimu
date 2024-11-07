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
          req.flash('errorlg', 'Incorrect password');
          return res.redirect('/login');
        }
      });
    } else {
      req.flash('errorlg', 'User not found'); 
      return res.redirect('/login');
    }
  });
};
