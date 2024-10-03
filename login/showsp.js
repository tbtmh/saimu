const User = require('../models/User');
const Temple = require('../models/Temple');

module.exports = async (req, res) => {
  try {
    // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    let UserData = await User.findById(req.session.userId).populate('savedplace');

    // ตรวจสอบว่าพบผู้ใช้หรือไม่
    if (!UserData) {
      return res.status(404).send("User not found");
    }

    // จำกัดจำนวนผลลัพธ์ (ถ้าต้องการ)
    const limitNumber = 5;
    const savedplace = UserData.savedplace.slice(0, limitNumber); // จำกัดจำนวนผลลัพธ์

    // ส่งข้อมูลไปยัง view
    res.render('sp', { savedplace }); // ส่ง savedplace ไปยัง view
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occurred" });
  }
};
