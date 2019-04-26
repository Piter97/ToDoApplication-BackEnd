const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');
const mytasks = require('./routes/mytasks');
const users = require('./routes/users');
const group = require('./routes/group');
const grouptasks = require('./routes/grouptasks');
const cors = require ('cors');
var bodyParser = require('body-parser');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

if (!config.get('jwtPrivateKey')) {  //VerySecureJWTKey
    console.error("FATAL ERROR: jwtPrivateKey is not defined.");
    process.exit(1);
}

mongoose.connect(config.get('db'), {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...',err));

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api/mytasks', mytasks);
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/group', group);
app.use('/api/grouptasks', grouptasks);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));