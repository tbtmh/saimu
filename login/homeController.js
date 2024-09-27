const User = require('../models/User')

require('../models/database');
const Category = require('../models/Category');

module.exports = async (req, res) => {

    try {
        let UserData = await User.findById(req.session.userId)
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
      
    
        res.render('home', { 

            title: 'Home', categories, UserData
        } );
      } 
      catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
      }
    
}