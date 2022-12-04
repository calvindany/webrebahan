exports.getIndex = (req, res, next) => {
    return res.render('admin/index');
};

exports.getPaketBaru = (req, res, next) => {
    return res.render('admin/paket-baru')
}