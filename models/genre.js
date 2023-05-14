var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id: {type: Number, required: true},
    name: {type: String, required: true},
    url: {type: String},
});

module.exports = mongoose.model('Genre', schema);