const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    blogs: [{heading: {type: String, required: true},
        body: {type: String, required: true},
    },{timestamps: true}]
}, {
    collection: 'userData'
})

const User = mongoose.model('User', userSchema);
module.exports = {User};