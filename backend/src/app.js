const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const logger = require('./config/logger');
const SocketService = require('./services/v1/socket');
const routes = require('./routes');

require('./config');

const app = express();

app.use(helmet());
app.use(morgan('dev', { stream: logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(routes);

SocketService.init();

module.exports = app;
