const logger = require('morgan');
const express = require('express'); 
const bodyParser = require('body-parser');
const request = require('request');
const cheerio = require('cheerio');
const mysql = require('mysql');
const mongoose = require('fs');

const URL = "https://news.goo.ne.jp";

const connect = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'db_crawll'
});
// Create an Express application
const app = express();
// Configure the app port
const port = process.env.PORT || 3000;
app.set('port', port);
app.use(bodyParser.json());

// Load middlewares
app.use(logger('dev')); 
// Start the server and listen on the preconfigured port
app.listen(port, () => console.log(`App started on port ${port}.`));

request(URL, function (err, res, body) {
    let arrayUrl = [];
    if(err) {
        console.log(err);
    } else {
        let $ = cheerio.load(body);
        $('.gn-news-list li').each(function(index){
            const link = $(this).find('a').attr('href');
            connect.query('SELECT `id` FROM employees', (err,rows) => {
                if(err) throw err;
              
                console.log('Data received from Db:\n');
                console.log(rows);
            });
            const item = {url: link};
        });
    }
});



app.get('/', (req, res) => {
    
});