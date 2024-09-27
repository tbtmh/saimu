const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:2pemq0KIsaQXOopl@cluster0.bxhj2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected')
});

// Models
require('./Category');
require('./Temple');