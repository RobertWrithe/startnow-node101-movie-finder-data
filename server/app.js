const express = require('express');
const app = express();
const axios = require('axios');
const logger  = require('morgan');
const link = {};

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

app.get('/', (req,res) => {
   if (link[req.url] == undefined) {
        axios.get('http://www.omdbapi.com' + req.url + '&apikey=8730e0e')
            .then(function (response) {
                link[req.url] = response.data;
                res.json(link[req.url]);
            })
            .catch(function (error) {
                res.status(500).send({error:'Error'});
        });
    } else {
        res.json(link[req.url]);
    }                      
});

app.use(logger('dev'));

module.exports = app;