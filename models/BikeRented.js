const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    rentPrice: {type: Number},
    dateOfRent: Date
});

module.exports = model('Bike_rented_list', schema);