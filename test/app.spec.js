const { add, sub } = require('../src/app');
const expect = require('chai').expect;

//bdd
describe('case 1', () => {
    afterEach(() => {
        console.log('afterEach');
    });
    beforeEach(() => {
        console.log('beforeEach');
    })
    after(() => {
        console.log('after');
    })
    before(() => {
        console.log('before');
    })
    it('add(2,3) should return 5', () => {
        expect(add(2,3)).to.be.equal(5);
    })
})

context('case 2', () => {
    specify('add(3,3) should return 6', () => {
        expect(add(3,3)).to.be.equal(6);
    })
})

//tdd
const { suite, test, suiteSetup, suiteTeardown, setup, teardown } = require('mocha');

suite('case 2', () => {
    suiteSetup(() => {
        console.log('suiteSetup');
    });
    suiteTeardown(() => {
        console.log('suiteTeardown');
    })
    setup(() => {
        console.log('setup');
    })
    teardown(() => {
        console.log('teardown');
    })
    test('add(3,3) should return 6', () => {
        expect(add(3,3)).to.be.equal(6);
    })
})
