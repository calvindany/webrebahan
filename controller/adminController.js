const mongoose = require('mongoose')
const PaketWisata = require('../model/paket_wisata');
const SewaMobil = require('../model/sewa_mobil');


/* ************PAKET WISATA************ */

exports.getPaketWisata = (req, res, next) => {
    PaketWisata.find()
    .then( (paket) => {
        return res.render('admin/paketwisata/paket-wisata', {
            paket : paket
        });
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getTambahPaketWisata = (req, res, next) => {
    return res.render('admin/paketwisata/tambah-paket')
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

exports.getEditPaketWisata = (req, res, next) => {
    const selectedPaketWisataId = req.params.idpaketwisata;
    
    console.log(selectedPaketWisataId)
    PaketWisata.findById({_id : selectedPaketWisataId})
    .then( paketwisata => {
        res.render('admin/paketwisata/edit-paket', {
            paketData : paketwisata
        })
        console.log(paketwisata);
    })
}

exports.postEditPaketWisata = (req, res, next) => {
    const updatedNama = req.body.namapaket;
    const updatedHarga = req.body.harga;
    const updatedDurasi = req.body.hari + " Hari " + req.body.malam + " Malam";
    const selectedPaketWisataId = req.body.idpaket;
    PaketWisata.findOne({_id : selectedPaketWisataId})
    .then( paketWisata => {
        paketWisata.nama = updatedNama;
        paketWisata.harga = updatedHarga;
        paketWisata.durasi = updatedDurasi;

        paketWisata.save();
        return res.redirect('/admin')
    })
    .catch( err => {
        console.log(err);
    })
}

exports.postHapusPaketWisata = (req, res, next) => {
    const selectedPaketWisata = req.body.paketid;
    PaketWisata.findByIdAndRemove(selectedPaketWisata)
    .then(result => {
        console.log("Data berhasil di hapus");
        return res.redirect('/admin')
    })
    .catch( err => {
        console.log(err);
    });
}

/* ************ SELESAI PAKET WISATA************ */


/* ************SEWA MOBIL************ */

exports.getSewaMobil = (req, res, next) => {
    SewaMobil.find()
    .then( (mobil) => {
        return res.render('admin/sewamobil/sewa-mobil', {
            mobil : mobil
        });
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getTambahSewaMobil = (req, res, next) => {
    res.render('admin/sewamobil/tambah-mobil');
}

exports.postTambahSewaMobil = (req, res, next) => {
    const namaMobil = req.body.namamobil;
    const harga = req.body.harga;
    const kapasitas = req.body.kapasitas;
    const driver = req.body.driver;
    const image = req.file;

    // conts imageArray = req.file

    const sewaMobil = new SewaMobil({
        mobil : namaMobil,
        harga : harga,
        kapasitas : kapasitas,
        driver : driver,
        image : req.file.filename
    });

    return sewaMobil.save()
    .then( result => {
        console.log('Data telah ditambahan');
        res.redirect('/admin/sewamobil')
    })
    .catch( err => {
        console.log(err);
    })
}

exports.getEditMobil = (req, res, next) => {
    const selectedMobilId = req.params.idmobil;

    return SewaMobil.findOne({ _id : selectedMobilId})
    .then ( mobil => {
      res.render('admin/sewamobil/edit-mobil', {
        mobil : mobil
      })  
    })
}

exports.postEditMobil = (req, res, next) => {
    const updatedMobil = req.body.namamobil;
    const updatedHarga = req.body.harga;
    const updatedKapasitas = req.body.kapasitas;
    const updatedDriver = req.body.driver;

    const selectedMobilId = req.body.idmobil;

    SewaMobil.findOne({ _id : selectedMobilId})
    .then( mobil => {
        mobil.mobil = updatedMobil,
        mobil.harga = updatedHarga,
        mobil.kapasitas = updatedKapasitas,
        mobil.driver = updatedDriver

        mobil.save();
        return res.redirect('/admin/sewamobil')
    })
}

exports.postHapusMobil = (req, res, next) => {
    const selectedIdMobil = req.body.idmobil;
    SewaMobil.findByIdAndDelete(selectedIdMobil)
    .then( result => {
        return res.redirect('/admin/sewamobil');
    })
}


/* ************ SELESAI PAKET WISATA************ */