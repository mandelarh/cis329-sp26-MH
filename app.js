const express = require('express');






const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: true})) // enables url encoding of data and directly acsess them via request body
