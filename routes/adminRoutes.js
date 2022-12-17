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
router.post('/editmobil/deletegambarmobil/:idmobil', adminController.postHapusGambarMobil);
router.post('/editmobil', adminController.postEditMobil);

router.post('/hapusmobil', adminController.postHapusMobil);


router.get('/kota', adminController.getKota);

router.get('/tambahkota', adminController.getTambahKota);
router.post('/tambahkota', adminController.postTambahKota);

router.get('/editkota/:idkota', adminController.getEditKota);
router.post('/editkota/hapusgambarkota/:idkota', adminController.postHapusGambarKota);
router.post('/editkota', adminController.postEditKota);

router.post('/hapuskota', adminController.postHapusKota);


module.exports = router;