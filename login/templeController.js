require('../models/database');
const Category = require('../models/Category');
const Temple = require('../models/Temple');
const User = require('../models/User'); // เพิ่มส่วนของ model User เพื่อใช้งาน

/**
 * GET /temple/:id
 * Temple details page
 */
module.exports = async (req, res) => {
  try {
    let templeId = req.params.id;
    const temple = await Temple.findById(templeId);
    const userId = req.session.userId; // รับ userId จาก session

    if (!temple) {
      req.flash('errsp', 'Temple not found');
      return res.redirect('/categories'); // เปลี่ยนไปหน้า error หากไม่พบ temple
    }

    let isSaved = false;
    if (userId) {
      // ดึงข้อมูลผู้ใช้
      const user = await User.findById(userId);
      if (user && user.savedplace) {
        // ตรวจสอบว่า templeId นี้เคยถูกบันทึกหรือยัง
        isSaved = user.savedplace.some(id => id.toString() === templeId);
      }
    }

    const msg = req.flash('errsp'); // ดึง flash message
    
    // ส่ง temple, msg และ isSaved ไปยัง view
    res.render('temple', { 
      temple, 
      msg,
      isSaved // ส่งค่า isSaved ไปด้วย เพื่อแสดงผลปุ่มที่ถูกต้อง
    });

  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};
