const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sewaMobil = new Schema({
    nama : {
        type : String,
        required : true
    },

    harga : {
        type : String,
        required : true
    },

    durasi : {
        type : String,
        required : true
    }
});

mongoose.pluralize(null);

module.exports = mongoose.model('sewa_mobil', sewaMobil);