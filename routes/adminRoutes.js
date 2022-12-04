const express = require('express');
const adminController = require('../controller/adminController.js');

const router = express.Router();

router.get('/', adminController.getIndex);
router.get('/paket-baru', adminController.getPaketBaru);

module.exports = router;