/*var users = [];

function checkData(func) { //функция проверки введённых данных. Принимает функцию в зависимости от нажатой кнопки
	var form = document.getElementById('login'); // доступ к форме авторизации
	var login = form.login.value; // данные из поля логина
	var pass = form.password.value; // данные из поля пароля

	if (login && pass) { // Не являются ли логин и/или пароль пустыми
		func(login, pass); // вызов функции в зависимости от нажатой кнопки
	} else {
		alert('Ошибка в логине и/или пароле'); 
	};
};

var log = function(login, pass) { // авторизация, принимает логин и пароль
	
	if (users[login] && users[login].pass === pass) { // пользователь существует и пароль совпадает с записанным ранее
		alert('Диаметр головы: ' + users[login].head + 
			'\nИмя матери Вашего второго кота: ' + users[login].mom +
			'\nПустая кредитная карта: ' + users[login].card);
	} else { 
		alert('Ошибка в логине и/или пароле'); // пользователя не существует или неверный пароль
	}
};

var reg = function(login, pass) { // регистрация, принимает логин и пароль

	if (users[login]) { // занят ли ник
		alert('Ник занят!');
	} else {
		users[login] = {pass: pass}; // данному нику присваивает пароль
		alert('Регистрация успешна!');

		if (confirm('Желаете продолжить страдать фигнёй?')) {
			users[login].head = prompt('Введите диаметр своей головы: ');
			users[login].mom = prompt('Введите имя матери Вашего второго кота: ');
			users[login].card = prompt('Введите номер своей кредитной карты и CW2-код: ');
			alert('На этом всё! Спасибо за то, что убили пару минут времени :)');
		} else {
			alert('Ну и ладно :(');
		};
	};
};*/

/*
var users = {}, //Список зарегистрированных пользователей
	form = document.getElementById('login'), // Доступ к форме авторизации
	dop2 = document.getElementById('dop2'),
	formStyle = form.login.style, // CSS стиль поля логина для дальнейшей эксплуатации
	func, //Сюда сохраняется функция к которой направятся данные пользователя
	msg = document.createElement('p');

function checkData() {
	var login = form.login.value, // Данные из поля логина
		pass = form.password.value; // Данные из поля пароля

	if(login && pass) {
		func(login, pass); // Вызов функции в зависимости от нажатой кнопки
	} else {
		appenMsg('Введите хоть что-то', 'red', false);
	};
};

function log(login, pass) {
	if(users[login] && users[login].pass === pass) {
		var inps = document.getElementsByTagName('input');
		appenMsg('Вход выполнен', 'green', true)
	} else {
		appenMsg('Ошибка в логине и/или пароле', 'red', false);
	};
};

function reg(login, pass) {
	if(users[login]) {
		formStyle.cssText = 'box-shadow: 0 0 25px red';
		appenMsg('Данный e-mail занят', 'red', false);
	} else {
		users[login] = {pass: pass};
		appenMsg('Регистрация прошла успешно', 'green', true);
	};
};


function appenMsg(mes, color, clr) {
	msg.innerHTML = mes;
	msg.style.color = color;
	form.appendChild(msg);
	if(clr)setTimeout(function() {msg.parentNode.removeChild(msg)}, 2000);
};*/

/*function start(func, req, res) {
 switch (func){
 case 'log':
 login(req, res);
 break;
 case 'reg':
 register(req, res);
 break;
 case 'read_data':
 data(req, res);
 break;
 default:
 err();
 break;
 }
 }

 function login(req, res) {
 if (users[req.body.login] && users[req.body.login].password === req.body.password) {
 res.render('pages/index', {
 dop: '../partials/inputs.ejs'
 });
 } else {
 res.end('Поьлзователя с данным e-mail не существует');
 }
 }

 function register(req, res) {
 if (users[req.body.login]) {
 res.end('Этот e-mail занят');
 } else {
 users[req.body.login] = {password: req.body.password};
 fs.writeFile('public/JSON/users.json', JSON.stringify(users), function (err) {
 if (err) throw err;
 });
 res.render('pages/index', {
 dop: '../partials/login.ejs'
 });
 }
 }

 function read_data(req, res) {
 console.log(req.body.event);
 }*/

let fs = require('fs'),
	users = JSON.parse(fs.readFileSync('public/JSON/users.json'));

function start(func, req, res) {
    switch (func){
        case 'log':
            login(req, res);
            break;
        case 'reg':
            register(req, res);
            break;
        case 'data':
			console.log(req.body.event);
        	if (req.body.event === 'read') {read_data(req, res)} else {write_data(req, res)};
			break;
		case 'out':
			out(req,res);
			break;
        default:
            break;
    }
}

function login(req, res) {
    if (users[req.body.login]) {
        if (users[req.body.login].password === req.body.password) {
        	req.session.log = true;
        	req.session.login = req.body.login;
		}
    } else {
        res.end('Поьлзователя с данным ником не существует');
    }
}

function register(req, res) {
    if (users[req.body.login]) {
        res.end('Этот ник занят');
    } else {
    	users[req.body.login] = {};
        users[req.body.login].password = req.body.password;
        users[req.body.login].mail = req.body.mail;

        fs.writeFile('public/JSON/users.json', JSON.stringify(users), function (err) {
            if (err) throw err;
        });
    }
}

function out(req, res) {
	req.session.log = false;
	req.session.writeData = false;
}

function read_data(req, res) {
	let login = req.session.login;
	users[login].mom = req.body.mom;
	users[login].sock = req.body.sock;
	users[login].date = req.body.date;

    fs.writeFile('public/JSON/users.json', JSON.stringify(users), function (err) {
        if (err) throw err;
    });
}

function write_data(req, res) {
    req.session.writeData = true;
}

module.exports = start;
module.exports.users = users;