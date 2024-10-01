const Category = require('../models/Category');
const Temple = require('../models/Temple');
const Amulet = require('../models/Amulet');

module.exports = async (req, res) => { 
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    
    // ดึงข้อมูลแยกกันระหว่าง Temple และ Amulet
    const categoryById = await Temple.find({ 'หมวดหมู่': categoryId }).limit(limitNumber);
    const categoryByIdamu = await Amulet.find({ 'หมวดหมู่': categoryId }).limit(limitNumber);

    res.render('categories', { 
      categoryById: categoryById,
      categoryByIdamu: categoryByIdamu
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};
