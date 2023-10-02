const express = require('express');
const app  = express();
const errorHandler = require('./middlewares/handleError');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config({path:path.join(__dirname,'config','config.env')});

//const __dirname = path.resolve()

const user = require('./routes/userRoutes');
const auth = require('./routes/authRoutes');

app.use(express.json()); 
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../frontend/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

app.use('/api', user);
app.use('/api', auth);


app.use(errorHandler);

module.exports = app;