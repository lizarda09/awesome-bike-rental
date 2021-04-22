const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    rentPrice: {type: Number}
});

module.exports = model('Bike_available_list', schema);