require('../models/database');
const Category = require('../models/Category');
const Temple = require('../models/Temple');
/**
 * GET /categories
 * Categories 
*/
module.exports= async(req, res) => {
   
    try {
      const limitNumber = 20;
      const categories = await Category.find({}).limit(limitNumber);
      res.render('categories', { categories } );
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
  } 