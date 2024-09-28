const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

/**
 * App Routes 
*/
const router = express.Router();
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');




global.loggedIn = null



// Controllers
const indexController = require('./login/indexController')
const loginController = require('./login/loginController')
const registerController = require('./login/registerController')
const storeUserController = require('./login/storeUserController')
const loginUserController = require('./login/loginUserController')
const logoutController = require('./login/logoutController')
const homeController = require('./login/homeController')
const chatbotController = require('./login/chatbotController');


/**
 * App Routes 
*/
const templeController = require('./login/templeController');
const exploreCategories = require('./login/exploreCategories');
const catbyidController = require('./login/catbyidController');






// Middleware
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authMiddleware = require('./middleware/authMiddleware')

/*
app.set('view engine', 'ejs')
*/

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret: "node secret"
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})


// added
app.use(cookieParser('CookingBlogSecure'));
app.use(fileUpload());



app.set('view engine', 'ejs')

//login
app.get('/', indexController)
app.get('/login', redirectIfAuth,loginController)
app.get('/register', redirectIfAuth,registerController)
app.post('/user/register', redirectIfAuth,storeUserController)
app.post('/user/login', redirectIfAuth,loginUserController)
app.get('/logout', logoutController)
app.get('/home',authMiddleware, homeController)

//chatbot
app.get('/chatbot', chatbotController);
app.post('/chatbot', chatbotController.postMessage);

//category
app.get('/categories', exploreCategories);
app.get('/categories/:id', catbyidController);
app.get('/temple/:id', templeController);




app.listen(4000, () => {
    console.log("App listening on port 4000")
})





