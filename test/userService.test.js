const { assert } = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");

const UserService = proxyquire("../src/userService", {
    "./models": { getUserCardNumber: sinon.stub().returns('123') } });

describe('#getUserCardNumber', () => {
    it('should return card number, callback way', (done) => {
        UserService.getUserCardNumber('123')
            .then(res => {
                assert.equal(res, '123');
                done();
            })
            .catch(err => {
                done(err);
            })
    });
    it('should return card number, promise based way', () => {
        return UserService.getUserCardNumber('123')
            .then(res => {
                assert.equal(res, '123');
            });
    });
    it('should return card number, async await based way', async () => {
        const cardNumber = await UserService.getUserCardNumber('123');
        assert.equal(cardNumber, '123');
    });
});
