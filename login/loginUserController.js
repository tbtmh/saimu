const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) => {
    const { email, password } = req.body 
    //const errorlgmsg = req.flash('errorlg')

    User.findOne({ email: email }).then((user) => {
        console.log(user)

        if (user) {
            let cmp = bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    req.session.userId = user._id
                    res.redirect('/home')
                } else {
                    //req.flash('errorlg', 'Incorrect password'); // เก็บข้อความแจ้งเตือนเมื่อรหัสผ่านผิด
                    res.redirect('/login')
                    //ต้องแจ้งว่ารหัสผิด
                }
            })
        } else {
           
            //req.flash('errorlg', 'User not found'); // เก็บข้อความแจ้งเตือนเมื่อไม่พบผู้ใช้
            res.redirect('/login')
            
            //ขึ้นว่ารหัสผิด
        }
    })

}

