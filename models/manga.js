var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    _id: {type: Number, required: true},
    url: {type: String, required: true},
    images: {type: Array, required: true},
    title: {type: String, required: true},
    title_english: {type: String},
    title_japanese: {type: String, required: true},
    type: {type: String },
    chapters: {type: Number},
    volumes: {type: Number},
    status:{ type: String },
    synopsis: {type: String, required: true},
    littleText: {type: String}, // background - texto representativo
    published: {type: Array},
    score: {type: Number},
    //characters: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
    genres: [{ type: Number, ref: 'Genre' }],
    authors: [{ type: Number, ref: 'Author' }],
});

module.exports = mongoose.model('Manga', schema);