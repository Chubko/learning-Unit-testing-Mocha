const expect = require('chai').expect;
const should = require('chai').should();
_ = require('lodash');

const  { alwaysTrue, legitString } = require('../src/2');

describe('#mocha basics', () => {
    it('true should be true', () => {
        true.should.be.true;
    });
    it('I expect true to be true', () => {
        true.should.be.true;
    });
});

describe('#alwaysTrue', () => {
    it('should always return true', () => {
        alwaysTrue().should.be.true;
    });
    it('I expect it to always be true', () => {
        expect(alwaysTrue()).to.be.true;
    });
    it('should not be false', () => {
        alwaysTrue().should.not.be.false;
    });
});

describe('#legitString', () => {
    it('should detect "cat" as a legit string', () => {
        legitString('cat').should.be.true;
    });
    it('undefined should not be true', () => {
        legitString().should.be.false;
    });
});

