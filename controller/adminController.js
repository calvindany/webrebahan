const mongoose = require('mongoose')
const PaketWisata = require('../model/paket_wisata');

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

exports.getIndex = (req, res, next) => {
    res.render('admin/sewamobil/sewa-mobil')
    // PaketWisata.find()
    // .then( (paket) => {
    //     return res.render('admin/sewamobil/sewa-mobil', {
    //         paket : paket
    //     });
    // })
    // .catch(err => {
    //     console.log(err);
    // })
};

// exports.getTambahPaketWisata = (req, res, next) => {
//     return res.render('admin/paketwisata/tambah-paket')
// }

// exports.postTambahPaketWisata = (req, res, next) => {
//     const nama = req.body.namapaket;
//     const harga = req.body.harga;
//     const durasi = req.body.hari + " Hari " + req.body.malam + " Malam";
//     const paketWisata = new PaketWisata({
//         nama : nama,
//         harga : harga,
//         durasi : durasi
//     });

//     paketWisata.save()
//     .then( result => {
//         console.log('Data Berhasil di Input');
//         return res.redirect('/admin');
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }

// exports.getEditPaketWisata = (req, res, next) => {
//     const selectedPaketWisataId = req.params.idpaketwisata;
    
//     console.log(selectedPaketWisataId)
//     PaketWisata.findById({_id : selectedPaketWisataId})
//     .then( paketwisata => {
//         res.render('admin/paketwisata/edit-paket', {
//             paketData : paketwisata
//         })
//         console.log(paketwisata);
//     })
// }

// exports.postEditPaketWisata = (req, res, next) => {
//     const updatedNama = req.body.namapaket;
//     const updatedHarga = req.body.harga;
//     const updatedDurasi = req.body.hari + " Hari " + req.body.malam + " Malam";
//     const selectedPaketWisataId = req.body.idpaket;
//     // console.log(selectedPaketWisataId);
//     PaketWisata.findOne({_id : selectedPaketWisataId})
//     .then( paketWisata => {
//         paketWisata.nama = updatedNama;
//         paketWisata.harga = updatedHarga;
//         paketWisata.durasi = updatedDurasi;

//         paketWisata.save();
//         return res.redirect('/admin')
//     })
//     .catch( err => {
//         console.log(err);
//     })
// }

// exports.postHapusPaketWisata = (req, res, next) => {
//     const selectedPaketWisata = req.body.paketid;
//     PaketWisata.findByIdAndRemove(selectedPaketWisata)
//     .then(result => {
//         console.log("Data berhasil di hapus");
//         return res.redirect('/admin')
//     })
//     .catch( err => {
//         console.log(err);
//     });
// }

/* ************ SELESAI PAKET WISATA************ */