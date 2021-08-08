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
}
// const coffee = new CoffeeShop();
// console.log(coffee)
// coffee.orderCoffee();
// console.log(coffee.orderCoffee('lattee'));
module.exports = { CoffeeShop };

