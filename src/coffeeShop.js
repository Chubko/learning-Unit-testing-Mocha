const { getUserCardNumber } = require('./userService');

class CoffeeShop {
    beans = 0;
    madeCups = 0;

    orderCoffee(coffeeType) {
        this.buyBeans(1);
        this.makeOneCup();

        switch (coffeeType) {
            case 'lattee': return 'LATTEE';
            case 'mochachino': return 'MOCHACHINO';
            case 'cappuchino': return 'CAPPUCHINO';
            default: return 'AMERICANO';
        }
    }

    buyBeans(amount) {
        this.beans += amount;
    }

    makeOneCup() {
        if (this.beans < 1) {
            throw Error('No beans (((');
        }

        this.beans--;
        this.madeCups++;
    }

    getDiscount(cardNumber) {
        return getUserCardNumber(cardNumber)
            .then(id => id === cardNumber);
    }
}


// const coffee = new CoffeeShop();
// console.log(coffee)
// coffee.orderCoffee();
// console.log(coffee.orderCoffee('lattee'));
// console.log(coffee.getDiscount('123'))
module.exports = { CoffeeShop };

