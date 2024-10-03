const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator');


const UserSchema = new Schema({

    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true, // note - this is a unqiue index - not a validation
        validate: {
            validator: function(value) {
                const self = this;
                const errorMsg = 'Email already in use!';
                return new Promise((resolve, reject) => {
                    self.constructor.findOne({ email: value })
                        .then(model => model._id ? reject(new Error(errorMsg)) : resolve(true)) // if _id found then email already in use 
                        .catch(err => resolve(true)) // make sure to check for db errors here
                });
            },
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function (v) {
                return validator.isStrongPassword(v, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                });
            },
            message: 'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and symbols.'
    }
},
    savedplace: [{ type: mongoose.Schema.Types.ObjectId, ref: "Temple"}],
})

UserSchema.pre('save', function(next) {
    const user = this

    bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
        next()
    }).catch(error => {
        console.error(error)
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = User

