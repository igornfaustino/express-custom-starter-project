const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errors = require('common-errors');
const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();
const port = process.env.PORT || 8080;

// statics
app.use(express.static('public'));

// -------- MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(errors.middleware.crashProtector());

app.use(
	expressWinston.logger({
		transports: [
			new winston.transports.File({ filename: 'logs/server.log' })
		],
		format: winston.format.json(),
		meta: true, // optional: control whether you want to log the meta data about the request (default to true)
		expressFormat: true // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
	})
);

// --------- routes
require('./routes')(app);

app.get('*', (req, res) => {
	res.send('express-custom-starter-project');
});

app.use(
	expressWinston.errorLogger({
		transports: [
			new winston.transports.Console(),
			new winston.transports.File({ filename: 'logs/error.log' })
		],
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.json()
		)
	})
);

app.use(errors.middleware.errorHandler);

app.listen(port, () => {
	console.log(`server listen on port ${port}`);
});

module.exports = app;
