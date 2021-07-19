const expect = require('chai').expect;
const should = require('chai').should();
_ = require('lodash');

const  { getPerson } = require('../src/3');

describe('#3 initial conditions', () => {
    it('initial person is an object', () => {
        const person = getPerson();
        _.isObject(person).should.be.true;
    });
    it('armorBonus by default is 0 wearing leatherArmor ', () => {
        const person = getPerson();
        person.armorBonus.should.equal(0); //BUG. should be 2 by default using leatherArmor. Fix is to not reset armorBonus to 0
    });
});
