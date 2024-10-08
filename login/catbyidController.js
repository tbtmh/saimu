const Category = require('../models/Category');
const Temple = require('../models/Temple');
const Amulet = require('../models/Amulet');
const User = require('../models/User');

module.exports = async (req, res) => { 
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const userId = req.session.userId;

    let savedTempleIds = [];
    if (userId) {
      // ดึงข้อมูลผู้ใช้
      const user = await User.findById(userId);
      if (user && user.savedplace) {
        // ดึงเฉพาะ templeId ที่บันทึกไว้ใน savedplace
        savedTempleIds = user.savedplace.map(id => id.toString());
      }
    }

    // ดึงข้อมูลแยกกันระหว่าง Temple และ Amulet
    const categoryById = await Temple.find({ 'หมวดหมู่': categoryId }).limit(limitNumber);
    const categoryByIdamu = await Amulet.find({ 'หมวดหมู่': categoryId }).limit(limitNumber);

    // เพิ่มฟิลด์ isSaved ในแต่ละวัด
    const templesWithSavedStatus = categoryById.map(temple => ({
      ...temple._doc,
      isSaved: savedTempleIds.includes(temple._id.toString())
    }));

    res.render('catwitid', { 
      categoryById: templesWithSavedStatus, // ส่งข้อมูลที่มี isSaved
      categoryByIdamu: categoryByIdamu
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};
