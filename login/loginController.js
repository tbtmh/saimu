module.exports = (req, res) => {
    const errorlg = req.flash('errorlg'); // ดึง flash message ที่ถูกเก็บไว้
    res.render('login', { errorlg }); // ส่ง flash message ไปที่หน้า login.ejs
  };
  