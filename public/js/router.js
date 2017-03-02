let fs = require('fs'),
    planets = JSON.parse(fs.readFileSync('public/JSON/planets.json')),
    bodyParser = require('body-parser'),
    login = require('./login'),
    users = JSON.parse(fs.readFileSync('public/JSON/users.json'));

function rout(app){
    app.get('/', function (req, res) {
        res.render('pages/index', {
            title: '',
            log: req.session.log,
            content: 'main',
            user: users[req.session.login],
            writeData: req.session.writeData
        });
    });

    app.get('/map', function (req, res) {
        res.render('pages/map', {
            planets: planets,
            log: req.session.cookie.log
        });
    });

    app.get('/planets/:planet', function (req, res) {
        let planetName = req.params.planet;
        res.render('pages/index', {
            content: './planets/' + planetName,
            title: ' - ' + planets[planetName],
            log: req.session.log,
            user: users[req.session.login],
            writeData: req.session.writeData
        });
    });

    app.post('/login/:butt', bodyParser.urlencoded({extended: false}), function (req, res) {
        login(req.params.butt, req, res);
        users = login.users;
        res.redirect('/');
    });

    app.get('/login/:butt', function (req, res) {
        login(req.params.butt, req, res);
        users = login.users;
        res.redirect('/');
    });
}

module.exports = rout;