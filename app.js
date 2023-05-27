const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { PORT, DATABASE_URL } = require('./config');
const routes = require('./routes/index');
const expressLimiter = require('./utils/rateLimiterConfig');

const app = express();

mongoose.connect(DATABASE_URL);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);
app.use(expressLimiter);
app.use(cors());
app.use(helmet());

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {});
