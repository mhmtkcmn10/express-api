const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Şifre alanı eklendi
    age: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
