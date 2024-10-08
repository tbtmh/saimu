const Category = require('../models/Category');
const Temple = require('../models/Temple');
const Amulet = require('../models/Amulet');
const User = require('../models/User');

module.exports = async (req, res) => { 
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;

    let isSaved = false;
    if (userId) {
      // ดึงข้อมูลผู้ใช้
      const user = await User.findById(userId);
      if (user && user.savedplace) {
        // ตรวจสอบว่า templeId นี้เคยถูกบันทึกหรือยัง
        isSaved = user.savedplace.some(id => id.toString() === templeId);
      }
    }
    
    
    // ดึงข้อมูลแยกกันระหว่าง Temple และ Amulet
    const categoryById = await Temple.find({ 'หมวดหมู่': categoryId }).limit(limitNumber);
    const categoryByIdamu = await Amulet.find({ 'หมวดหมู่': categoryId }).limit(limitNumber);

    res.render('catwitid', { 
      categoryById: categoryById,
      categoryByIdamu: categoryByIdamu,
      isSaved
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};
