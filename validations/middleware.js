const Joi = require('joi');
const errors = require('common-errors');

const middleware = (schema, property) => {
	return (req, _res, next) => {
		const { error, value } = Joi.validate(req[property], schema);
		if (error) {
			const { details } = error;
			const message = details.map(i => i.message).join(',');
			return next(new errors.ValidationError(message));
		}
		req[property] = value;
		return next();
	};
};

module.exports = middleware;
