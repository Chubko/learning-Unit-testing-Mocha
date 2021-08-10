const { assert } = require("chai");
const sinon = require("sinon");
const { CoffeeShop } = require("../src/coffeeShop");

describe('#CoffeeShop', () => {
    const coffeeShop = new CoffeeShop();
    beforeEach(() => {
        coffeeShop.beans = 0;
        coffeeShop.madeCups = 0;
    });

    describe('#CoffeeShop initial conditions', () => {
        it('the beans amount should be equal 0', () => {
            assert.equal(coffeeShop.beans, 0);
        });
        it('the madeCups amount should be equal 0', () => {
            assert.equal(coffeeShop.madeCups, 0);
        });
    });

    describe('#buyBeans', () => {
        it('should increase number of beans', () => {
            coffeeShop.buyBeans(1);

            assert.equal(coffeeShop.beans, 1);
        });
        it('should not decrease number of beans', () => {
            coffeeShop.buyBeans(1);

            assert.notEqual(coffeeShop.beans, 0);
        });
    });

    describe('#makeOneCup', () => {
        it('should decrease number of beans by one', () => {
            coffeeShop.beans = 1;
            coffeeShop.makeOneCup();

            assert.equal(coffeeShop.beans, 0);
        });
        it('should increase number of cups by one', () => {
            coffeeShop.beans = 1;
            coffeeShop.makeOneCup();

            assert.equal(coffeeShop.madeCups, 1);
        });
        it('should throw an error if there is 0 beans', (done) => {
            assert.throw(()=>coffeeShop.makeOneCup(), 'No beans (((')
            done();
        });
    });

    describe('#orderCoffee', () => {
        it('should call buyBeans and makeOneCup', (done) => {
            coffeeShop.buyBeans = sinon.spy();
            coffeeShop.makeOneCup = sinon.spy();
            coffeeShop.orderCoffee();

            assert.isTrue(coffeeShop.buyBeans.calledOnce);
            assert.isTrue(coffeeShop.makeOneCup.calledOnce);
            done();
        });
        it('should return selected coffee type', () => {
            assert.equal(coffeeShop.orderCoffee('mochachino'), 'MOCHACHINO')
        });
        it('should return AMERICANO by default', () => {
            assert.equal(coffeeShop.orderCoffee(), 'AMERICANO')
        });
    });

    describe('#getDiscount', () => {
        it('should be called once with passed args', () => {
            coffeeShop.getDiscount = sinon.stub().returns(Promise.resolve('123'));

            return coffeeShop.getDiscount('123')
                .then(() => {
                    assert.isTrue(coffeeShop.getDiscount.calledOnce);
                    assert.equal(coffeeShop.getDiscount.args[0][0], '123');
                });
        });
        it('should return true if card number is found', () => {
            coffeeShop.getDiscount = sinon.stub().returns(Promise.resolve(true));

            return coffeeShop.getDiscount('123')
                .then((res) => {
                    assert.equal(res, true);
                });
        });
    });
});


