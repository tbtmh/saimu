// module.exports = (req, res) => {
//    let email = ""
//     let password = ""
//     let data = req.flash('data')[0]

//     if (typeof data != "undefined") {
//         email = data.email
//         password = data.password
//     }
//     res.render('register', {
//         errors: req.flash('validationErrors'),
//         email: email,
//         password: password
//     })
    
// }

const validator = require('validator');

module.exports = (req, res) => {
    let email = "";
    let password = "";
    let data = req.flash('data')[0];
    //เพิ่มเช็คเมลซ้ำ แล้วอเลิต
    if (typeof data != "undefined") {
        email = data.email;
        password = data.password;
    }

    // กำหนดเงื่อนไขให้กับรหัสผ่าน เช่น ความยาวขั้นต่ำและความซับซ้อน
    const passwordValid = validator.isStrongPassword(password, {
        minLength: 8,      // รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร
        minLowercase: 1,   // ต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว
        minUppercase: 1,   // ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว
        minNumbers: 1,     // ต้องมีตัวเลขอย่างน้อย 1 ตัว
        minSymbols: 1      // ต้องมีสัญลักษณ์พิเศษอย่างน้อย 1 ตัว
    });

    // ตรวจสอบเงื่อนไขของรหัสผ่าน
    if (!passwordValid) {
        req.flash('validationErrors', 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return res.redirect('/register');
    }

    // เรนเดอร์หน้าฟอร์มสมัครสมาชิกพร้อมค่าที่กรอกไว้
    res.render('register', {
        errors: req.flash('validationErrors'),
        email: email,
        password: password
    });
}
