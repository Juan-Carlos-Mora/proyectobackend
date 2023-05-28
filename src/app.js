const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const Product= require('./Routes/Product.router');
const Cars = require('./Routes/Cars.Product');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', Product);
app.use('/api', Cars);

app.listen(port, () => {console.log(`Server listening on port ${port}`);});