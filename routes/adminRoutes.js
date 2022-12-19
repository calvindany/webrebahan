const express = require('express');
const adminController = require('../controller/adminController.js');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/login', adminController.getLogin);
router.post('/login', adminController.postLogin);
router.get('/logout', adminController.getLogout);

router.get('/', isAuth.isAuthorized, adminController.getPaketWisata);

router.get('/tambahpaketwisata', isAuth.isAuthorized, adminController.getTambahPaketWisata);
router.post('/tambahpaketwisata', isAuth.isAuthorized, adminController.postTambahPaketWisata);

router.get('/editpaketwisata/:idpaketwisata', isAuth.isAuthorized, adminController.getEditPaketWisata);
router.post('/editpaketwisata', isAuth.isAuthorized, adminController.postEditPaketWisata);

router.post('/hapuspaketwisata', isAuth.isAuthorized, adminController.postHapusPaketWisata);


router.get('/sewamobil', isAuth.isAuthorized, adminController.getSewaMobil);

router.get('/tambahsewamobil', isAuth.isAuthorized, adminController.getTambahSewaMobil);
router.post('/tambahsewamobil', isAuth.isAuthorized, adminController.postTambahSewaMobil);

router.get('/editmobil/:idmobil', isAuth.isAuthorized, adminController.getEditMobil);
router.post('/editmobil/deletegambarmobil/:idmobil', isAuth.isAuthorized, adminController.postHapusGambarMobil);
router.post('/editmobil', isAuth.isAuthorized, adminController.postEditMobil);

router.post('/hapusmobil', isAuth.isAuthorized, adminController.postHapusMobil);


router.get('/kota', isAuth.isAuthorized, adminController.getKota);

router.get('/tambahkota', isAuth.isAuthorized, adminController.getTambahKota);
router.post('/tambahkota', isAuth.isAuthorized, adminController.postTambahKota);

router.get('/editkota/:idkota', isAuth.isAuthorized, adminController.getEditKota);
router.post('/editkota/hapusgambarkota/:idkota', isAuth.isAuthorized, adminController.postHapusGambarKota);
router.post('/editkota', isAuth.isAuthorized, adminController.postEditKota);

router.post('/hapuskota', isAuth.isAuthorized, adminController.postHapusKota);


router.get('/artikel', isAuth.isAuthorized, adminController.getArtikel);
router.get('/tambahartikel', isAuth.isAuthorized, adminController.getTambahArtikel);
router.post('/tambahartikel', isAuth.isAuthorized, adminController.postTambahArtikel);
router.get('/editartikel/:artikelid', isAuth.isAuthorized, adminController.getEditArtikel);
router.post('/editartikel', isAuth.isAuthorized, adminController.postEditArtikel);
router.post('/editartikel/hapusgambarartikel/:idartikel',  isAuth.isAuthorized, adminController.postHapusGambarArtikel);


module.exports = router;