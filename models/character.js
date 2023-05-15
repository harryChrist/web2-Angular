var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id: {type: String, required: true},
    url: {type: String},
    images: {type: Array},
    name:{type: String},
});

module.exports = mongoose.model('Character', schema);