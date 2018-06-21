const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
let app = express();


app.set('view engine', 'ejs');


app.use((req, res, next) => {
    let now = new Date().toString();
    let log =`${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) =>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
// res.render('maintenance.ejs')
// });
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.ejs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.ejs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});


// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
