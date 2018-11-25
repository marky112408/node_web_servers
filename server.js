const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getFullYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (txt) => {
	return txt.toUpperCase();
});

app.set('veiw engine', 'hbs');

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use((req, res, next) => {
	var log = new Date().toString()+"-"+req.method+" "+req.url+"\n";
	fs.appendFile('log.txt', log, (err) => {
		if(err){
			console.log(err);
		}
	});
	next();
});

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMsg: "Welcome to my funckin website"
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	})
});

app.get('/project', (req, res) => {
	res.render('projects.hbs');
});

app.get('/bad', (req, res) => {
	res.send('<h1 style = "text-align:center;">404 Request Not Found</h1>');
});

app.listen(port, () => {
	console.log('Server is starting at port '+port);
});