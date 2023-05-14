var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id: {type: String},
    type: {type: String},
    name: {type: String},
    url: {type: String}
});

module.exports = mongoose.model('Author', schema);