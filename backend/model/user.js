const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    contactNumber: String,
    address: {
        streetName: String,
        streetNumber: String,
        apartmentName: String,
        city: String,
        state: String,
        postalCode: String
    },
    gender: String,
    role: {
        type: String,
        enum: ['Customer', 'Seller'], // Ensure these match frontend values
        required: true
    },
    emailid: String,
    password: String
});

module.exports = mongoose.model('newdb', userSchema);
