const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const mongodb = require('mongodb');

const PaketWisata = require('../model/paket_wisata');
const SewaMobil = require('../model/sewa_mobil');
const Kota = require('../model/kota');
const fileHelper = require('../util/fileDelete');
const Artikel = require('../model/artikel');
const Admin = require('../model/admin');
const { runInNewContext } = require('vm');

/* ************PAKET WISATA************ */

exports.getPaketWisata = (req, res, next) => {
    PaketWisata.find()
        .then((paket) => {
            return res.render('admin/paketwisata/paket-wisata', {
                paket: paket,
                isAuth : req.session.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getTambahPaketWisata = (req, res, next) => {
    return res.render('admin/paketwisata/tambah-paket', {
        isAuth : req.session.isLoggedIn
    })
}

exports.postTambahPaketWisata = (req, res, next) => {
    const nama = req.body.namapaket;
    const harga = req.body.harga;
    const durasi = req.body.hari + " Hari " + req.body.malam + " Malam";
    const paketWisata = new PaketWisata({
        nama: nama,
        harga: harga,
        durasi: durasi
    });

    paketWisata.save()
        .then(result => {
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
    PaketWisata.findById({ _id: selectedPaketWisataId })
        .then(paketwisata => {
            res.render('admin/paketwisata/edit-paket', {
                paketData: paketwisata,
                isAuth : req.session.isLoggedIn
            })
            console.log(paketwisata);
        })
}

exports.postEditPaketWisata = (req, res, next) => {
    const updatedNama = req.body.namapaket;
    const updatedHarga = req.body.harga;
    const updatedDurasi = req.body.hari + " Hari " + req.body.malam + " Malam";
    const selectedPaketWisataId = req.body.idpaket;
    PaketWisata.findOne({ _id: selectedPaketWisataId })
        .then(paketWisata => {
            paketWisata.nama = updatedNama;
            paketWisata.harga = updatedHarga;
            paketWisata.durasi = updatedDurasi;

            paketWisata.save();
            return res.redirect('/admin')
        })
        .catch(err => {
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
        .catch(err => {
            console.log(err);
        });
}

/* ************ SELESAI PAKET WISATA************ */


/* ************SEWA MOBIL************ */

exports.getSewaMobil = (req, res, next) => {
    SewaMobil.find()
        .then((mobil) => {
            return res.render('admin/sewamobil/sewa-mobil', {
                mobil: mobil,
                isAuth : req.session.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getTambahSewaMobil = (req, res, next) => {
    Kota.find()
        .then(kota => {
            res.render('admin/sewamobil/tambah-mobil', {
                kota: kota,
                isAuth : req.session.isLoggedIn
            });
        })
}

exports.postTambahSewaMobil = (req, res, next) => {
    const namaMobil = req.body.namamobil;
    const harga = req.body.harga;
    const kapasitas = req.body.kapasitas;
    const driver = req.body.driver;
    const kota = req.body.kota;
    let image
    let availableKota = [];

    if (req.file) {
        image = req.file.filename
    } else {
        image = 'null'
    };


    //Extract kota arrat from body to array stucture like model
    for (let i = 0; i < kota.length; i++) {
        availableKota.push({ items: new mongodb.ObjectId(kota[i]) })
    }

    const sewaMobil = new SewaMobil({
        mobil: namaMobil,
        harga: harga,
        kapasitas: kapasitas,
        driver: driver,
        image: image,
        kota: availableKota
    });

    return sewaMobil.save()
        .then(result => {
            console.log('Data telah ditambahan');
            res.redirect('/admin/sewamobil')
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getEditMobil = (req, res, next) => {
    const selectedMobilId = req.params.idmobil;

    return SewaMobil.findOne({ _id: selectedMobilId })
        .then(mobil => {
            res.render('admin/sewamobil/edit-mobil', {
                mobil: mobil,
                isAuth : req.session.isLoggedIn
            })
        })
}

exports.postEditMobil = (req, res, next) => {
    const updatedMobil = req.body.namamobil;
    const updatedHarga = req.body.harga;
    const updatedKapasitas = req.body.kapasitas;
    const updatedDriver = req.body.driver;
    let image

    if (req.file) {
        image = req.file.filename;
    }
    const selectedMobilId = req.body.idmobil;

    SewaMobil.findOne({ _id: selectedMobilId })
        .then(mobil => {
            mobil.mobil = updatedMobil,
                mobil.harga = updatedHarga,
                mobil.kapasitas = updatedKapasitas,
                mobil.driver = updatedDriver

            if (fs.existsSync('public/image/' + mobil.image)) {
                fileHelper.deleteFile('public/image/' + mobil.image)
                mobil.image = image;
            } else if (image) {
                mobil.image = image;
            } else {
                mobil.image = 'null';
            }


            mobil.save();
            return res.redirect('/admin/sewamobil')
        })
}

exports.postHapusGambarMobil = (req, res, next) => {
    const selectedMobilId = req.body.idmobil;

    SewaMobil.findOne({ _id: selectedMobilId })
        .then(mobil => {
            if (fs.existsSync('public/image/' + mobil.image)) {
                fileHelper.deleteFile('public/image/' + mobil.image)
            }

            mobil.image = "null";

            mobil.save();
            return res.redirect('/admin/editmobil/' + selectedMobilId);
        })
}

exports.postHapusMobil = (req, res, next) => {
    const selectedIdMobil = req.body.idmobil;

    SewaMobil.findOne({ _id: selectedIdMobil })
        .then(mobil => {
            if (fs.existsSync('public/image/' + mobil.image)) {
                fileHelper.deleteFile('public/image/' + mobil.image)
            }
            return SewaMobil.findByIdAndDelete(selectedIdMobil)
        })
        .then(result => {
            return res.redirect('/admin/sewamobil');
        })
}


/* ************ SELESAI SEWA MOBIL ************ */


/* ************ MULAI KOTA ************ */

exports.getKota = (req, res, next) => {
    Kota.find()
        .then(kota => {
            res.render('admin/kota/kota', {
                kota: kota,
                isAuth : req.session.isLoggedIn
            })
        })
}

exports.getTambahKota = (req, res, next) => {
    res.render('admin/kota/tambah-kota', {
        isAuth : req.session.isLoggedIn
    });
}

exports.postTambahKota = (req, res, next) => {
    const namaKota = req.body.namakota;

    let image

    if (req.file) {
        image = req.file.filename;
    } else {
        image = 'null'
    }

    const kota = new Kota({
        namakota: namaKota,
        image: image
    })

    return kota.save()
        .then(result => {
            console.log('Data Kota Terinput')
            res.redirect('/admin/kota')
        })
}

exports.getEditKota = (req, res, next) => {
    const selectedIdKota = req.params.idkota;

    Kota.findOne({ _id: selectedIdKota })
        .then(kota => {
            // console.log(kota)
            res.render('admin/kota/edit-kota', {
                kota: kota,
                isAuth : req.session.isLoggedIn
            })
        })
}

exports.postEditKota = (req, res, next) => {
    const updatedNamaKota = req.body.namakota;
    let image

    if (req.file) {
        image = req.file.filename;
    }

    const selectedIdKota = req.body.idkota;

    Kota.findOne({ _id: selectedIdKota })
        .then(kota => {
            kota.namakota = updatedNamaKota;

            if (fs.existsSync('public/image/' + kota.image)) {
                fileHelper.deleteFile('public/image/' + kota.image)
                kota.image = image;
            } else if (image) {
                kota.image = image;
            } else {
                kota.image = 'null';
            }

            kota.save();
            return res.redirect('/admin/kota')
        })
}

exports.postHapusGambarKota = (req, res, next) => {
    const selectedIdKota = req.params.idkota;

    Kota.findOne({ _id: selectedIdKota })
        .then(kota => {
            if (fs.existsSync('public/image/' + kota.image)) {
                fileHelper.deleteFile('public/image/' + kota.image)
            }

            kota.image = "null";

            kota.save();
            return res.redirect('/admin/editkota/' + selectedIdKota);
        })
}

exports.postHapusKota = (req, res, next) => {
    const selectedIdKota = req.body.idkota;

    Kota.findOneAndDelete({ _id: selectedIdKota })
        .then(result => {
            if (fs.existsSync('public/image/' + kota.image)) {
                fileHelper.deleteFile('public/image/' + kota.image)
            }
            console.log('Data Deleted');

            return res.redirect('/admin/kota')
        })
}

/* ************ AKHIR KOTA ************ */


/* ************ MULAI ARTIKEL ************ */

exports.getArtikel = (req, res, next) => {
    Artikel.find()
        .then(artikel => {
            res.render('admin/artikel/artikel', {
                artikel: artikel,
                isAuth : req.session.isLoggedIn
            });
        })
}


exports.getTambahArtikel = (req, res, next) => {
    res.render('admin/artikel/tambah-artikel', {
        isAuth : req.session.isLoggedIn
    })
}

exports.postTambahArtikel = (req, res, next) => {

    const judul = req.body.judul;
    const textArtikel = req.body.artikel;

    let image

    if (req.file) {
        image = req.file.filename;
    } else {
        image = 'null'
    }

    const artikel = new Artikel({
        judul: judul,
        text : textArtikel,
        image: image
    })

    return artikel.save()
        .then(result => {
            console.log('Data Artikel Terinput')
            res.redirect('/admin/artikel')
        })
}

exports.getEditArtikel = (req, res, next) => {
    const selectedIdArtikel = req.params.artikelid;

    Artikel.findOne({_id : selectedIdArtikel})
    .then( artikel => {
        res.render('admin/artikel/edit-artikel', {
            artikel : artikel,
            isAuth : req.session.isLoggedIn
        })
    })
}


exports.postEditArtikel = (req, res, next) => {
    const selectedIdArtikel = req.body.artikelid;

    const updatedJudul = req.body.judul;
    const updatedTextArtikel = req.body.artikel;
    let image

    if(req.file){
        image = req.file.filename;
    }


    Artikel.findOne({_id : selectedIdArtikel})
    .then( artikel => {
        if (fs.existsSync('public/image/' + artikel.image)) {
            fileHelper.deleteFile('public/image/' + artikel.image)
            artikel.image = image;
        } else if (image) {
            artikel.image = image;
        } else {
            artikel.image = 'null';
        }

        artikel.judul = updatedJudul;
        artikel.text = updatedTextArtikel;

        artikel.save();
        return res.redirect('/admin/artikel');
    })
    .catch(err => {
        console.log(err);
    })
}

exports.postHapusGambarArtikel = (req, res, next) => {
    const selectedIdArtikel = req.params.idartikel;

    Artikel.findOne({ _id: selectedIdArtikel })
        .then(artikel => {
            if (fs.existsSync('public/image/' + artikel.image)) {
                fileHelper.deleteFile('public/image/' + artikel.image)
            }

            artikel.image = "null";

            artikel.save();
            return res.redirect('/admin/editartikel/' + selectedIdArtikel);
        })
}

/* ************ AKHIR ARTIKEL ************ */


/* ************ MULAI AUTH ************ */

exports.getLogin = (req, res, next) => {
    res.render('admin/login', {
        isAuth : req.session.isLoggedIn
    });
}

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    Admin.findOne({username : username})
    .then( admin => {
        if(admin || password == admin.password){
            req.session.isLoggedIn = true;
            req.session.admin = admin;
            
            console.log('Login Successful');
            return req.session.save( err => {
                if(err) {
                    console.log(err)
                }
                res.redirect('/admin/');
            });
        } else {
            console.log('Wrong username and password');
            return res.redirect('/admin/login');
        }

    })
}


exports.getLogout = (req, res, next) => {
    req.session.destroy( (err) => {
        console.log(err);
    });
    res.redirect('/admin');
}

/* ************ AKHIR AUTH ************ */