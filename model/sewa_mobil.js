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
        required: true
    },
    image: {
        type: String
    },
    kota: [{
        items: {
            type: Object
        }
    }]
});

mongoose.pluralize(null);

module.exports = mongoose.model('sewa_mobil', sewaMobil);