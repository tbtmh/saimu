require('../models/database');
const Amulet = require('../models/Amulet');


/**
 * GET /amulet/:id
 * Amulet details page
 */
module.exports = async (req, res) => {
    try {
        let amuletId = req.params.id;
        const amulet = await Amulet.findById(amuletId);
    
        if (!amulet) {
          req.flash('errsp', 'Amulet not found');
          return res.redirect('/categories'); // เปลี่ยนไปหน้า error หากไม่พบ amulet
        }
    
        const msg = req.flash('errsp'); // ดึง flash message
        
        res.render('amulet', { 
          amulet, 
          msg // ส่ง msg ไปยังหน้า ejs
        });
    
      } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
      }
      
  
    
  };

