const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sewaMobil = new Schema({
    mobil: {
        type: String,
        required: true
    },

    harga: {
        type: Number,
        required: true
    },

    kapasitas: {
        type: String,
        required: true
    },
    driver: {
        type: Number,
        required : true
    },
    image: {
        type : String,
        required : true
    }
});

mongoose.pluralize(null);

module.exports = mongoose.model('sewa_mobil', sewaMobil);