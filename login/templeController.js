require('../models/database');
const Category = require('../models/Category');
const Temple = require('../models/Temple');


/**
 * GET /temple/:id
 * Temple 
*/
module.exports = async(req, res) => {
  try {
    let templeId = req.params.id;
    const temple = await Temple.findById(templeId);
    res.render('temple', { 
      
      temple } );

  } 
  catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 
































