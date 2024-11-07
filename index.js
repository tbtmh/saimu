const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// Middleware
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuth = require('./middleware/redirectIfAuth');

// Controllers
const indexController = require('./login/indexController');
const loginController = require('./login/loginController');
const registerController = require('./login/registerController');
const storeUserController = require('./login/storeUserController');
const loginUserController = require('./login/loginUserController');
const logoutController = require('./login/logoutController');
const homeController = require('./login/homeController');
const chatbotController = require('./login/chatbotController');
const exploreCategories = require('./login/exploreCategories');
const catbyidController = require('./login/catbyidController');
const templeController = require('./login/templeController');
const amuletController = require('./login/amuletController');
const savedController = require('./login/savedController');
const showsp = require('./login/showsp');

// Global Variables
global.loggedIn = null;

// App Configurations
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(flash());
app.use(expressSession({
    secret: "node secret"
}));
app.use(cookieParser('CookingBlogSecure'));
app.use(fileUpload());
app.set('view engine', 'ejs');

// Set global loggedIn variable
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

// Routes
// Home
app.get('/', indexController);
app.get('/home', authMiddleware, homeController);

// Login Routes
app.get('/login', redirectIfAuth, loginController);
app.get('/register', redirectIfAuth, registerController);
app.post('/user/register', redirectIfAuth, storeUserController);
app.post('/user/login', redirectIfAuth, loginUserController);
app.get('/logout', logoutController);

// Chatbot
app.get('/chatbot', chatbotController);
app.post('/chatbot', chatbotController.postMessage);

// Category Routes
app.get('/categories', exploreCategories);
app.get('/categories/:id', catbyidController);
app.get('/temple/:id', templeController);
app.get('/amulet/:id', amuletController);

// Saved Place Route
app.post('/savedplace', authMiddleware, savedController);
app.get('/sp', showsp);

// Start Server
app.listen(4000, () => {
    console.log("Server is running at http://localhost:4000/");
});
