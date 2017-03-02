var express = require('express')
    ,app = express()
    ,engine = require('ejs-locals')
    ,router = require('./public/js/router')
    ,path = require('path')
    ,session = require('express-session');

app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(__dirname + '/public'));

router(app);

app.listen(8080);
