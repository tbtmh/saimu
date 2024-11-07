module.exports = (req, res) => {
    if (req.session.userId) {  
        res.redirect('/home');  
    } else {
        res.render('index');  
    }
}
