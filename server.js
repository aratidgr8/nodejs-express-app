const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;


var app = express();

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine', 'hbs');


//Create a Access Log
app.use((request, response, next) =>{

	var now = new Date().toString();
	var log = `${now}: ${request.method} ${request.url}`;

	console.log(log);

	fs.appendFile('server.log', log + '\n', (errorMessage)=>{
		if(errorMessage)
			console.log('Unable to append to server log');
	});

	next();
})


//Code to activate Maintenance Mode, mostly commented
/*app.use((request, response, next)=>{

	response.render('maintenance.hbs');

});*/


//Static Help Page for App
app.use(express.static(__dirname+'/public'));



//Actual App Routing & Functionality Starts from here
hbs.registerHelper('getFullYearVal', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
	return text.toUpperCase();
})


app.get('/', (request, response)=>{

	//response.send('<h1>Hello World!</h1>');
	response.render('home.hbs', {
		pageTitle : "Home",
		welcomeMsg: "Hello and Welcome!"
	})

});

app.get('/about', (request, response) =>{

	//response.send('About Page');
	response.render('about.hbs', {
		pageTitle : "About Page"
	});

});


app.get('/projects', (request, response) =>{

	response.render('projects.hbs', {
		pageTitle: "My Portfolio"
	})

});


app.get('/bad', (request, response) =>{

	response.send({
		errorMessage : 'Unable to process request',
	})

});

app.listen(port, () => {
	console.log(`Server is up & running at port: ${port}`);
});