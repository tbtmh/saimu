const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

// MongoDB Connection
mongoose.connect('mongodb+srv://admin:2pemq0KIsaQXOopl@cluster0.bxhj2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true
})

global.loggedIn = null



// Controllers
const indexController = require('./login/indexController')
const loginController = require('./login/loginController')
const registerController = require('./login/registerController')
const storeUserController = require('./login/storeUserController')
const loginUserController = require('./login/loginUserController')
const logoutController = require('./login/logoutController')
const homeController = require('./login/homeController')

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
app.set('view engine', 'ejs')


app.get('/', indexController)
app.get('/login', redirectIfAuth,loginController)
app.get('/register', redirectIfAuth,registerController)
app.post('/user/register', redirectIfAuth,storeUserController)
app.post('/user/login', redirectIfAuth,loginUserController)
app.get('/logout', logoutController)
app.get('/home',authMiddleware, homeController)


app.listen(4000, () => {
    console.log("App listening on port 4000")
})