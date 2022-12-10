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


module.exports = router;