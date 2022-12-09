const mongoose = require('mongoose')
const PaketWisata = require('../model/paket_wisata');

exports.getIndex = (req, res, next) => {
    PaketWisata.find()
    .then( (paket) => {
        return res.render('admin/index', {
            paket : paket
        });
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getTambahPaketWisata = (req, res, next) => {
    return res.render('admin/tambah-paket')
}

exports.postTambahPaketWisata = (req, res, next) => {
    const nama = req.body.namapaket;
    const harga = req.body.harga;
    const durasi = req.body.hari + " Hari " + req.body.malam + " Malam";
    const paketWisata = new PaketWisata({
        nama : nama,
        harga : harga,
        durasi : durasi
    });

    paketWisata.save()
    .then( result => {
        console.log('Data Berhasil di Input');
        return res.redirect('/admin');
    })
    .catch(err => {
        console.log(err);
    })
}

exports.postHapusPaketWisata = (req, res, next) => {
    const selectedPaketWisata = req.params.paketid;
    PaketWisata.findOneAndDelete(mongoose.isObjectIdOrHexString(selectedPaketWisata))
    .then(result => {
        console.log("Data berhasil di hapus");
        res.redirect('/admin/')
    })
    .catch( err => {
        console.log(err);
    });
    // res.redirect('/');
}