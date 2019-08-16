const { expect } = require('chai');

const testObjectFields = (expected, actual) => {
	Object.keys(expected).forEach(key => {
		if (typeof expected[key] === 'object')
			return testObjectFields(expected[key], actual[key]);
		if (Array.isArray(expected[key]))
			return testArrayItens(expected[key], actual[key]);
		return expect(actual[key]).to.be.equal(expected[key]);
	});
};

const testArrayItens = (expected, actual) => {
	expect(actual)
		.to.be.an('array')
		.that.length(expected.length);
	expected.forEach((value, idx) => {
		if (typeof expected[idx] === 'object')
			return testObjectFields(expected[idx], actual[idx]);
		if (Array.isArray(expected[idx]))
			return testArrayItens(expected[idx], actual[idx]);
		return expect(actual[idx]).to.be.equal(value);
	});
};

const compare = (expected, actual) => {
	if (Array.isArray(expected)) return testArrayItens(expected, actual);
	if (typeof expected === 'object') return testObjectFields(expected, actual);
	return expect(actual).to.be.equal(expected);
};

module.exports = {
	compare
};
