const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please tell us your name!'],
    },
    username: {
        type: String, 
        required: [true, 'Please tell us your username!'],
    },
    email: {
        type: String, 
        required: [true, 'Please provide your email!'],
        unique: true,
        lowercase: true, 
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    bio: {
        type: String,
        required: false,
        maxlength: 100, 
        default: 'bio',

    },
    photo: {
        type: String, 
        default: 'img/users/user-B7c.jpg',
    },
    password: {
        type: String,
        required: [true, 'Please provide a password!'],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on SAVE !!! 
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords are not same',
        },
    },
    github: {
        type: String,
        required: false,
        default: 'https://github.com/',
    },
    role: {
        type: String,
        enum: ['writer', 'admin'],
        default: 'writer'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
    }]
})

userSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified 
    if (!this.isModified('password')) return next()

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12)

    // Delete passwordConfirm field 
    this.passwordConfirm = undefined 
    next()
})


// Instance method is available in all document of certain collections
userSchema.methods.correctPassword = async function (
    candidatePassword, 
    userPassword,
) {
    return await bcrypt.compare(candidatePassword, userPassword)
}


const User = mongoose.model('User', userSchema)
module.exports = User