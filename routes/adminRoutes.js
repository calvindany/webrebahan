const express = require('express');
const adminController = require('../controller/adminController.js');

const router = express.Router();

router.get('/', adminController.getIndex);
router.get('/tambahpaketwisata', adminController.getTambahPaketWisata);
router.post('/tambahpaketwisata', adminController.postTambahPaketWisata);
router.post('/hapuspaketwisata', adminController.postHapusPaketWisata);

module.exports = router;