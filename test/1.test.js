const expect = require('chai').expect;
const should = require('chai').should();

describe('#mocha basics', () => {
    it('true should be true', () => {
        true.should.be.true;
    });
    it('I expect true to be true', () => {
        expect(true).to.be.true;
    });
});


