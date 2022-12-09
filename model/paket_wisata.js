const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paketWisata = new Schema({
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

module.exports = mongoose.model('paket_wisata', paketWisata);