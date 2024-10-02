require('../models/database');
const Category = require('../models/Category');
const Temple = require('../models/Temple');


/**
 * GET /temple/:id
 * Temple details page
 */
module.exports = async (req, res) => {
  try {
    let templeId = req.params.id;
    const temple = await Temple.findById(templeId);

    if (!temple) {
      req.flash('errsp', 'Temple not found');
      return res.redirect('/categories'); // เปลี่ยนไปหน้า error หากไม่พบ temple
    }

    const msg = req.flash('errsp'); // ดึง flash message
    
    res.render('temple', { 
      temple, 
      msg // ส่ง msg ไปยังหน้า ejs
    });

  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};
































