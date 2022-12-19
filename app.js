const express = require('express');
const path = require('path');
const monggose = require('mongoose');
const multer = require('multer');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');


const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');

const Admin = require('./model/admin')

const app = express();

const MONGODB_URI = 'mongodb://localhost:27017/webrebahan';

const store = new MongoDBStore({
    uri : MONGODB_URI,
    collection : 'adminSession'
});

//App Configuration
app.set('view engine', 'ejs');
app.set('views', 'views');

//Multer COnfiguration
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/image")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    if( file.mimetype === "image/jpg" || file.mimetype === "image/png" ||file.mimetype === "image/jpeg"){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

//Util for Application
app.use(bodyParser.urlencoded({extended : false}));
app.use(multer({storage : fileStorage, fileFilter: fileFilter}).single('images'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/public/image')));
app.use(session({
    secret : 'Session Secret',
    resave : 'false',
    saveUninitialized : false,
    store : store
}))

//Base Routing
app.use('/', userRouter);
app.use('/admin', adminRouter);
// app.use((req, res, next) => {
//     res.status(404).render();
// });

monggose.connect(MONGODB_URI)
.then( result => {
    console.log("Connected")

    Admin.find()
    .then( admin => {
        // if(admin.length < 1){
        //     const admin = new Admin({
        //         email : 'calvin@email.com',
        //         password : '1234'
        //     })
        //     admin.save();
        // }
        app.listen(3000);
    })
})
.catch(err => {
    console.log(err);
})

