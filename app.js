const express = require('express');
const path = require('path');
const monggose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');

const app = express();

const MONGODB_URI = 'mongodb://localhost:27017/webrebahan';

//App Configuration
app.set('view engine', 'ejs');
app.set('views', 'views');


//Util for Application
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

//Base Routing
app.use('/', userRouter);
app.use('/admin', adminRouter);
// app.use((req, res, next) => {
//     res.status(404).render();
// });

monggose.connect(MONGODB_URI)
.then( result => {
    console.log("Connected")
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})

