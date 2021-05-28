const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 10
    },

    userName: {
        type: String,
        required: true,
        index: true,
        trim: true,
        lowercase: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },

    hash_password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin'
    },

    contactNumber: {
        type: String
    },
    profilePicture: {
        type: String
    }
},
    {
        timestamps: true
    }
)

userSchema.virtual('password')
    .set(function (password) {
    this.hash_password = bcrypt.hashSync(password, 10)
    })

userSchema.methods = {
    authenticate: (password) => {
        this.hash_password = bcrypt.compare(password, this.hash_password)
    } 
}


module.exports = mongoose.model('User', userSchema)