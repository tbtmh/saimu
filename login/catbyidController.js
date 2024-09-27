require('../models/database');
const Category = require('../models/Category');
const Temple = require('../models/Temple');

/**
 * GET /categories/:id
 * Categories By Id
*/ 
module.exports = async(req, res) => { 
    try {
      let categoryId = req.params.id;
      const limitNumber = 20;
      const categoryById = await Temple.find({ 'หมวดหมู่': categoryId }).limit(limitNumber);
      console.log(categoryById)
      res.render('categories', { 
        
        categoryById } );

    } 
    catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
  }