const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const environments = require('./environments');

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

const error = require('./middlewares/error');
const winston = require('winston');

const app = express();

require('./bootstrap/config')();
require('./bootstrap/database')();
require('./bootstrap/logging')();
require('./bootstrap/validation')();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//use router
app.use('/', userRoutes.router);
app.use('/', authRoutes.router);
app.use('/', taskRoutes.router);

//custom error
app.use(error);

app.listen(environments.port, () => {
    winston.info(`Server started on url ${environments.url}`);
});