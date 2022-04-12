const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    signUpDate: {
        type: Date,
        default: Date.now(),
    }
});


module.exports = mongoose.model('User', UserSchema);