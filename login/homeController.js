const User = require('../models/User');
require('../models/database');
const Category = require('../models/Category');
const Temple = require('../models/Temple');

module.exports = async (req, res) => {
    try {
        const loggedIn = req.session.userId; 

        if (loggedIn) {
            let UserData = await User.findById(req.session.userId).populate('savedplace');
            const limitNumber = 5;
            const categories = await Category.find({});
            const savedplaceLimited = UserData.savedplace.slice(0, limitNumber);

            res.render('home', {
                title: 'Home',
                categories,
                UserData,
                savedplaceLimited,
                loggedIn 
            });
        } else {
            res.redirect('/login');
        }

    } catch (error) {
        res.status(500).send({ message: error.message || "homeController Error" });
    }
}
