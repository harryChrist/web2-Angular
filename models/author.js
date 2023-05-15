var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id: {type: Number, required: true},
    images:{type: Array},
    name: {type: String, required: true},
    birthday: {type: String},
    about: {type: String},
});

module.exports = mongoose.model('Author', schema);