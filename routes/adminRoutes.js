const express = require('express');
const adminController = require('../controller/adminController.js');

const router = express.Router();

router.get('/', adminController.getPaketWisata);

router.get('/tambahpaketwisata', adminController.getTambahPaketWisata);
router.post('/tambahpaketwisata', adminController.postTambahPaketWisata);

router.get('/editpaketwisata/:idpaketwisata', adminController.getEditPaketWisata);
router.post('/editpaketwisata', adminController.postEditPaketWisata);

router.post('/hapuspaketwisata', adminController.postHapusPaketWisata);


router.get('/sewamobil', adminController.getSewaMobil);

router.get('/tambahsewamobil', adminController.getTambahSewaMobil);
router.post('/tambahsewamobil', adminController.postTambahSewaMobil);

router.get('/editmobil/:idmobil', adminController.getEditMobil);
router.post('/editmobil', adminController.postEditMobil);

router.post('/hapusmobil', adminController.postHapusMobil);

module.exports = router;