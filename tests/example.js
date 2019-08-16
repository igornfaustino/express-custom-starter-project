const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const { expect } = chai;
chai.use(chaiHttp);

describe('test example', () => {
	it('should get a status 200', done => {
		chai.request(server)
			.get('/')
			.end((_err, res) => {
				expect(res).to.have.status(200);
				done();
			});
	});
});
