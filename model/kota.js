const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const kotaSchema = new Schema({
    namakota : {
        type : String,
        required : true
    },
    image : {
        type : String
    }
});

module.exports = mongoose.model('kota', kotaSchema);