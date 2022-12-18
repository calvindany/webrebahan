const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artikelSchema = new Schema({
    judul : {
        type : String,
        required : true
    },
    text : {
        type : String
    },
    image : {
        type : String
    }
});

module.exports = mongoose.model('artikel', artikelSchema);