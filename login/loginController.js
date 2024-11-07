module.exports = (req, res) => {
    const errorlg = req.flash('errorlg'); 
    res.render('login', { errorlg }); 
  };
  